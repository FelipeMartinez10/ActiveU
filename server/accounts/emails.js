Accounts.emailTemplates.siteName = 'ActiveU';
Accounts.emailTemplates.from     = 'ActiveU <no-reply@activeU.com>';

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return '[ActiveU - Don\'t Reply] Verify Your Email Address';
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = 'ActiveU2017@outlook.com',
      emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};
