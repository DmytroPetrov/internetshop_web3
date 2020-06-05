

      export function loginUser(api, token,  data, router, location) : void {
        api.loginUser(data).subscribe(
          data => {
            token.setCookie(data);
            console.log('Backed');
            
            location.back();
            //router.navigate(['']);
          },
          error => {
            console.log(error)
          }
        )
      }