from jinja2 import Template

class JinjaEmail(object):

    def generate_param_body(self, sender, recipient_list, subject, email_body):
        return param_template.render(sender=sender,recipient_list=recipient_list,subject=subject,email_body=email_body)

#Will have to work on how to create the design of the email template
param_template = Template("""
    """)

