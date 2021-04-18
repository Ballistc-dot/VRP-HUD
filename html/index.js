$(function () {
  window.addEventListener('message', (event) => {

    if (event.data.type == 'hud_update_info') {
      $('#life_hud_hover').css("width", `${event.data.health}%`)
      $('#bullet_proof_hud_hover').css("width", `${event.data.armor}%`)
    }
    
    if (event.data.type == 'hud_update_info_top') {
      if (event.data.isInCar == 1) {
        $('.container').css('display', 'none')
        $('.speedometer').css('display', 'flex')
      } else {
        $('.container').css('display', 'flex')
        $('.speedometer').css('display', 'none')
      }

      let hours = event.data.hours
      let minutes = event.data.minutes

      if (Number(event.data.hours) < 10) {
        hours = '0' + hours
      }
      if (Number(event.data.minutes) < 10) {
        minutes = '0' + minutes
      }
      const time = hours + ':' + minutes
      $('#street_name').text(`${event.data.street_name}`)
      $('#hour').text(`${time}`)
    }
    if (event.data.type == 'hud_update_info_speedometer') {
      const speed = Math.round(event.data.speed)
      $('#speedometer').text(`${speed}`)
    }
  })
})