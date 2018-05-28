  //create the function
  function nextIte(profile) {
    //set the index to 0
    let nextIndex = 0;

    return {
      next() {
        return nextIndex < profile.length 
          ?{value: profile[nextIndex++], done: false}
          :
          {done: true}
      }
    }
  }
  let selector = {
    next : 'next',
    profile : 'profileDisplay',
    image: 'imageDisplay'
  }
  
//Using AJAX to fetch data
  var xhr = new XMLHttpRequest()

  xhr.open('GET', 'https://api.github.com/users', true)

  xhr.onload = function() {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      //set profile to the data coming from the API
      let profile = nextIte(data)
      //call the load function to load the first profile
      loadProfile()
      //create an event listener for the button
      document.getElementById(selector.next).addEventListener('click', loadProfile)

      function loadProfile() {
        //get the value of the current and next data
        const currentProfile = profile.next().value
          //check if the current value is not undefined
          if(currentProfile !== undefined){
            document.getElementById(selector.profile).innerHTML =
            `<ul class="list-group">
                    <li class="list-group-item">Login: ${currentProfile.login}</li>
                    <li class="list-group-item">Id: ${currentProfile.id}</li>
                    <li class="list-group-item">Type: ${currentProfile.type}</li>
              </ul>
            `
            document.getElementById(selector.image).innerHTML = `<img src="${currentProfile.avatar_url}" class="w-25">`;
          }
        else {
          //reload the page after the last iteration
          window.location.reload()
        }
      }
    }
  }
  xhr.send()