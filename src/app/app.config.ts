import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig{
    public authorizationUrl: string = 'http://localhost:5000/connect/authorize';
    public authorizationEndSessionUrl: string = 'http://localhost:5000/connect/endsession';
    public client_id: string = 'C5AF0B45-CE96-4481-A24A-44508FEB9F58';
    public redirect_uri: string = 'http://localhost:21308';
    public redirectPostLogout_uri: string = 'http://localhost:21308';
    public response_type: string = "id_token token";
    public scope: string = "openid profile Default";
    public nonce: string = "N" + Math.random() + "" + Date.now();
    public state = Date.now() + "" + Math.random();
    public apiBaseUrl: string = 'http://localhost:57159/'
}
// export class AppConfig {
//     public authorizationUrl: string = 'https://ifar-extranet-test.hsl.harvard.edu/identity/connect/authorize';
//     public authorizationEndSessionUrl: string = 'https://ifar-extranet-test.hsl.harvard.edu/identity/connect/endsession';
//     public client_id: string = 'C5AF0B45-CE96-4481-A24A-44508FEB9F58';
//     public redirect_uri: string = 'https://ifar-extranet-test.hsl.harvard.edu/portal';
//     public redirectPostLogout_uri: string = 'https://ifar-extranet-test.hsl.harvard.edu/portal';
//     public response_type: string = "id_token token";
//     public scope: string = "openid profile Default";
//     public nonce: string = "N" + Math.random() + "" + Date.now();
//     public state = Date.now() + "" + Math.random();
//     public apiBaseUrl: string = 'https://ifar-extranet-test.hsl.harvard.edu/api/'
// }
// export class AppConfig {
//     public authorizationUrl: string = 'https://ifar-extranet.hsl.harvard.edu/identity/connect/authorize';
//     public authorizationEndSessionUrl: string = 'https://ifar-extranet.hsl.harvard.edu/identity/connect/endsession';
//     public client_id: string = 'C5AF0B45-CE96-4481-A24A-44508FEB9F58';
//     public redirect_uri: string = 'https://ifar-extranet.hsl.harvard.edu/portal';
//     public redirectPostLogout_uri: string = 'https://ifar-extranet.hsl.harvard.edu/portal';
//     public response_type: string = "id_token token";
//     public scope: string = "openid profile Default";
//     public nonce: string = "N" + Math.random() + "" + Date.now();
//     public state = Date.now() + "" + Math.random();
//     public apiBaseUrl: string = 'https://ifar-extranet.hsl.harvard.edu/api/'
// }