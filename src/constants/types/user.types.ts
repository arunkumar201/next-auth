export interface User {
	email: string;
	password: string;
	fullName: string;
	profileImg: string;
	dateOfBirth?: string;
	phoneNumber?: string;
	country?: string;
	city?: string;
	stateOrProvince?: string;
	postalCode?: string;
	gender?: string;
	interests?: string[];
	bio?: string;
	userName: string;
}

export interface LoginCredentialType {
	email: string;
	password: string;
}
