  function nextIte(profile) {
    let nextIndex = 0;

    return {
      next: function() {
        return nextIndex < profile.length 
          ?{value: profile[nextIndex++], done: false}
          :
          {done: true}
      }
    }
  }

  var xhr = new XMLHttpRequest()

  xhr.open('GET', 'https://api.github.com/users', true)

  xhr.onload = function() {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      let profile = nextIte(data)
      load()
      document.getElementById('next').addEventListener('click', load)

      function load() {
        const current = profile.next().value
          if(current !== undefined){
            document.getElementById('profileDisplay').innerHTML =
            `
                <ul class="list-group">
                  
                    <li class="list-group-item">Login: ${current.login}</li>
                    <li class="list-group-item">Id: ${current.id}</li>
                    <li class="list-group-item">Type: ${current.type}</li>
                </ul>
            `
            document.getElementById('imageDisplay').innerHTML = `<img src="${current.avatar_url}" class="w-25">`;
          }
        else {
          window.location.reload()
        }
      }
    }
  }
  xhr.send()