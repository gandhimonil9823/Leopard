from jinja2 import Template


class Jinja(object):

    def generate_param_body(self, parameters):
        return param_template.render(parameters=parameters)


param_template = Template("""
   <p><h1> CUSTOMER TEMPLATE </h1 >
    
        <div> Hello {{parameters.first_name}} {{parameters.last_name}} I would like to tell you about </div>   
            <div> {% for message in parameters.messages %}
                            <br> {{message}}</br> 
                  {% endfor %} 
            </div> 
   <p>  
                                        """)
