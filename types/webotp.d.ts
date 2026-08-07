interface OTPCredential extends Credential {
  readonly code: string;
}

interface OTPCredentialRequestOptions {
  transport: string[];
}

interface CredentialRequestOptions {
  otp?: OTPCredentialRequestOptions;
}
