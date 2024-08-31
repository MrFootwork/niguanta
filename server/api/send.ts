import { Resend } from 'resend'

// FIXME remove nuxt-mail, if this works
const resend = new Resend(process.env.NUXT_MAIL_RESEND_API_KEY)
export default defineEventHandler(async () => {
  const { data, error } = await resend.emails.send({
    from: 'Website <no-reply@pandau.de>',
    to: ['pandau.ting+niguanta@gmail.com'],
    subject: 'Hello world',
    text: 'This works great!',
    html: '<strong>It works!</strong>',
  })

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

  console.log('🚀 ~ defineEventHandler ~ data:', data)

  return data
})
