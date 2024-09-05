import { Resend } from 'resend'
import { render } from '@vue-email/render'
import MyTemplate from '~/templates/EmailContact.vue'

const config = useRuntimeConfig()
const resend = new Resend(config.resendAPIToken)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const props = {
    title: 'Email from niguanta blog',
    name: body.name,
    email: body.email,
    message: body.message,
  }

  // render email
  const html = await render(MyTemplate, props, {
    pretty: true,
  })

  const text = await render(MyTemplate, props, {
    plainText: true,
  })

  // send email
  const { data, error } = await resend.emails.send({
    from: config.mailSender,
    to: [config.mailTarget],
    subject: `Contact Form used by ${props.name}`,
    text,
    html,
  })

  console.log('🚀 ~ defineEventHandler ~ data, error:', data, error)

  // handle errors
  if (error) {
    console.error(error)
    // @ts-expect-error: resend doesn't type statusCode on response.
    // But it's there!
    const statusCode = error.statusCode

    // resend domain is not verified
    if (statusCode === 403) {
      throw createError({
        statusCode: 403,
        statusMessage: error.name,
        message: 'The admin hasn\'t verified his email domain. Please ask him to do so!',
      })
    }

    // Any other error
    throw createError({
      statusCode: 500,
      statusMessage: error.name,
      message: error.message,
    })
  }

  // return email id from resend
  return data
})
