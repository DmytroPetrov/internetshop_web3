

      export function loginUser(api, token,  data, router) : void {
        api.loginUser(data).subscribe(
          data => {
            token.setCookie(data)
            router.navigate(['']);
          },
          error => {
            console.log(error)
          }
        )
      }