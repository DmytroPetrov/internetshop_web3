

      export function registerNewUser(api, token,  data, router) : void {
        api.registerNewUser(data).subscribe(
          data => {
            token.setCookie(data)
            router.navigate(['']);
          },
          error => {
            console.log(error)
          }
        )
      }