"""The setuptools setup file."""
from setuptools import setup

with open('README.md') as file:
    long_description = file.read()

with open('VERSION') as version_file:
    version = version_file.read().strip()

setup(
    name='leopard',
    version=version,
    author='Raul Gonzalez',
    author_email='raul@xeniosystems.com',
    description='leopard Event Handler',
    long_description=long_description,
    packages=['leopard', ],
    install_requires=[
        "cognate==0.0.6",
        "gevent==1.2.2",
        "pyramid==1.9.1",
        "redis==2.10.6",
        "python-dateutil==2.7.2",
        "boto3==1.7.8",
        "pymongo==3.7.1",

    ],
    include_package_data=True,
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 2.7',
        'Topic :: Software Development',

    ]
)
