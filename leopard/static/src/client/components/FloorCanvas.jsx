import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getColorByStringHash } from '../../shared/util';

class FloorCanvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.image = React.createRef();

    this.zoom = this.zoom.bind(this);
    this.trackTransforms = this.trackTransforms.bind(this);
    this.redraw = this.redraw.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.drawPositions = this.drawPositions.bind(this);
    this.drawCoverageArea = this.drawCoverageArea.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
  }

  trackTransforms() {
    const ctx = this.ctx;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let xform = svg.createSVGMatrix();
    this.ctx.getTransform = function () {
      return xform;
    };

    const savedTransforms = [];
    const save = this.ctx.save;
    this.ctx.save = function () {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };

    const restore = this.ctx.restore;
    this.ctx.restore = function () {
      xform = savedTransforms.pop();
      return restore.call(ctx);
    };

    const scale = this.ctx.scale;
    this.ctx.scale = function (sx, sy) {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(ctx, sx, sy);
    };

    const rotate = this.ctx.rotate;
    this.ctx.rotate = function (radians) {
      xform = xform.rotate(radians * 180 / Math.PI);
      return rotate.call(ctx, radians);
    };

    const translate = this.ctx.translate;
    this.ctx.translate = function (dx, dy) {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };

    const transform = this.ctx.transform;
    this.ctx.transform = function (a, b, c, d, e, f) {
      const m2 = svg.createSVGMatrix();
      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(ctx, a, b, c, d, e, f);
    };

    const setTransform = this.ctx.setTransform;
    this.ctx.setTransform = function (a, b, c, d, e, f) {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };

    const pt = svg.createSVGPoint();
    this.ctx.transformedPoint = function (x, y) {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse());
    };
  }

  clearCanvas() {
    // Clear the entire canvas
    const p1 = this.ctx.transformedPoint(0, 0);
    const p2 = this.ctx.transformedPoint(this.canvasObjs.width, this.canvasObjs.height);
    this.ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvasObjs.width, this.canvasObjs.height);
    this.ctx.restore();
  }

  redraw() {
    this.clearCanvas();
    this.ctx.drawImage(this.image.current, 0, 0);
    this.drawCoverageArea();
    this.drawPositions();
  }

  zoom(clicks) {
    const pt = this.ctx.transformedPoint(this.lastX, this.lastY);
    this.ctx.translate(pt.x, pt.y);
    const factor = Math.pow(this.scaleFactor, clicks);
    this.ctx.scale(factor, factor);
    this.ctx.translate(-pt.x, -pt.y);
    this.redraw();
  }

  handleScroll(evt) {
    const delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
    if (delta) this.zoom(delta);
    return evt.preventDefault() && false;
  }

  drawPositions() {
    if (this.dragStart) return;
    console.log(`draw positions ${this.props.positionData.length}`);
    const imageObj = this.image.current;
    const imageWidth = imageObj.width;
    const imageHeight = imageObj.height;

    if (this.props.positionData && this.props.positionData.length > 0) {
      const userColors = {};
      for (let i = 0; i < this.props.positionData.length; i += 1) {
        const position = JSON.parse(this.props.positionData[i]);
        userColors[position.userid] = '';
      }

      Object.entries(userColors).forEach(([key]) => {
        userColors[key] = `#${getColorByStringHash(key)}`;
      });

      const floorWidth = this.props.floorImage.dimensions.width || 100;
      const floorLength = this.props.floorImage.dimensions.length || 100;

      const posXScale = imageWidth / floorWidth;
      const posYScale = imageHeight / floorLength;


      for (let i = 0; i < this.props.positionData.length; i += 1) {
        const circle = new Path2D();
        const position = JSON.parse(this.props.positionData[i]);
        const drawPosX = (position.x) * posXScale;
        const drawPosY = (position.y) * posYScale;

        circle.moveTo(Math.floor(drawPosX), Math.floor(drawPosY));
        circle.arc(Math.floor(drawPosX), Math.floor(drawPosY), 5, -1, Math.floor(2 * Math.PI));

        this.ctx.fillStyle = userColors[position.userid];
        this.ctx.fill(circle);
      }
    }
  }

  drawCoverageArea() {
    const imageObj = this.image.current;
    const imageWidth = imageObj.width;
    const imageHeight = imageObj.height;

    if (this.props.floorImage && this.props.floorImage.dimensions) {
      const floorWidth = this.props.floorImage.dimensions.width || 100;
      const floorLength = this.props.floorImage.dimensions.length || 100;

      const posXScale = imageWidth / floorWidth;
      const posYScale = imageHeight / floorLength;

      const x1 = this.props.floorImage.dimensions.xmin * posXScale;
      const y1 = this.props.floorImage.dimensions.ymin * posYScale;

      const x2 = this.props.floorImage.dimensions.xmax * posXScale;
      const y2 = this.props.floorImage.dimensions.ymax * posYScale;

      this.ctx.beginPath();
      this.ctx.lineWidth = '20';
      this.ctx.strokeStyle = '#038DFF50';
      this.ctx.rect(Math.floor(x1), Math.floor(y1), Math.floor(x2 - x1), Math.floor(y2 - y1));
      this.ctx.stroke();
    }
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
    this.trackTransforms();
    this.canvasObjs = this.canvas.current;

    this.lastX = this.canvasObjs.width / 2;
    this.lastY = this.canvasObjs.height / 2;
    this.dragStart = false;
    this.dragged = false;
    this.scaleFactor = 1.1;


    this.canvasObjs.addEventListener('mousedown', (evt) => {
      document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
      this.lastX = evt.offsetX || (evt.pageX - this.canvasObjs.offsetLeft);
      this.lastY = evt.offsetY || (evt.pageY - this.canvasObjs.offsetTop);
      this.dragStart = this.ctx.transformedPoint(this.lastX, this.lastY);
      this.dragged = false;
    }, false);

    this.canvasObjs.addEventListener('mousemove', (evt) => {
      this.lastX = evt.offsetX || (evt.pageX - this.canvasObjs.offsetLeft);
      this.lastY = evt.offsetY || (evt.pageY - this.canvasObjs.offsetTop);

      this.dragged = true;
      if (this.dragStart) {
        const pt = this.ctx.transformedPoint(this.lastX, this.lastY);
        this.ctx.translate(pt.x - this.dragStart.x, pt.y - this.dragStart.y);
        this.redraw();
      }
    }, false);

    this.canvasObjs.addEventListener('mouseup', (evt) => {
      this.dragStart = null;
      this.drawPositions();
      // if (!this.dragged) this.zoom(evt.shiftKey ? -1 : 1);
    }, false);

    this.canvasObjs.addEventListener('DOMMouseScroll', this.handleScroll, false);
    this.canvasObjs.addEventListener('mousewheel', this.handleScroll, false);

    this.image.current.onload = () => {
      this.lastX = 0;
      this.lastY = 0;

      if (this.props.floorImage && this.props.floorImage.dimensions) {
        console.log('coverage prepare');
        const imageObj = this.image.current;
        const imageWidth = imageObj.width;
        const imageHeight = imageObj.height;

        const floorWidth = this.props.floorImage.dimensions.width || 100;
        const floorLength = this.props.floorImage.dimensions.length || 100;

        const posXScale = imageWidth / floorWidth;
        const posYScale = imageHeight / floorLength;

        const x1 = this.props.floorImage.dimensions.xmin * posXScale;
        const y1 = this.props.floorImage.dimensions.ymin * posYScale;

        const pt = this.ctx.transformedPoint(x1 - (x1 / 2), y1 - (y1 / 4));
        this.ctx.translate(-pt.x, -pt.y);

        this.zoom(-8);

        this.lastX = pt.x;
        this.lastY = pt.y;
      }

      this.redraw();
    };
  }

  componentDidUpdate(nextProps) {
    if (nextProps.loadingImage || nextProps.loadingData) {
      this.clearCanvas();
    } else if (nextProps.floorImage && nextProps.floorImage.link &&
      this.image.current.src !== nextProps.floorImage.link) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.image.current.src = nextProps.floorImage.link;
    }
    this.redraw();
  }

  render() {
    return (
      <div className="heatmap">
        <Spin size="large" className={this.props.loadingImage || this.props.loadingData ? 'loading' : 'hidden'} />
        <div>
          <canvas ref={this.canvas} width={this.props.width} height={this.props.height} />
          <img
            ref={this.image}
            alt="floorPlan"
            className="hidden"
          />
        </div>
      </div>
    );
  }
}

FloorCanvasComponent
  .propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    floorImage: PropTypes.shape(),
    loadingImage: PropTypes.bool.isRequired,
    loadingData: PropTypes.bool.isRequired,
    positionData: PropTypes.arrayOf(PropTypes.string)
  };

FloorCanvasComponent
  .defaultProps = {
    floorImage: { link: '', dimensions: {} },
    positionData: []
  };

const
  mapStateToProps = (state, ownProps) => ({
    width: ownProps.width || '1200',
    height: ownProps.height || '650',
    floorImage: state.floorImage.image,
    loadingImage: state.floorImage.loading,
    loadingData: state.chartData.loading,
    positionData: state.chartData.xyData && state.chartData.xyData[state.selectedFloor] ?
      state.chartData.xyData[state.selectedFloor] : []
  });

export default connect(mapStateToProps)(FloorCanvasComponent);

