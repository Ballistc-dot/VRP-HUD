$(function () {
  function setProgressSpeed(value, element) {
    var circle = document.querySelector(element);
    var radius = circle.r.baseVal.value;
    var circleference = radius * 2 * Math.PI;
    var percent = value * 100 / 220;
    var offset;
    $('#speedometer_text_1').css({ fill: '#FFF' })
    $('#speedometer_text_2').css({ fill: '#FFF' })
    $('#speedometer_text_3').css({ fill: '#FFF' })
    if (value.length >= 3) {
      $('#speedometer_text_1').text(`${value[0]} `)
      $('#speedometer_text_2').text(`${value[1]} `)
      $('#speedometer_text_3').text(`${value[2]} `)
    } else if (value.length >= 2) {
      $('#speedometer_text_1').css({ fill: '#969494' }).text(0)
      $('#speedometer_text_2').text(`${value[0]} `)
      $('#speedometer_text_3').text(`${value[1]} `)
    } else {
      $('#speedometer_text_1').css({ fill: '#969494' }).text(0)
      $('#speedometer_text_2').css({ fill: '#969494' }).text(0)
      $('#speedometer_text_3').text(`${value[0]} `)

    }
    circle.style.strokeDasharray = `${circleference} ${circleference} `;
    circle.style.strokeDashoffset = `${circleference} `;

    if (value <= 230) {
      offset = + circleference + ((+ percent * 96) / 100) / 100 * circleference;

      circle.style.strokeDashoffset = -offset;

    } else {
      offset = 690
      circle.style.strokeDashoffset = -offset;
    }
  }
  window.addEventListener('message', (event) => {

    if (event.data.type == 'hud_update_info') {
      $('#life_hud_hover').css("width", `${event.data.health}% `)
      $('#bullet_proof_hud_hover').css("width", `${event.data.armor}% `)
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
      $('#street_name').text(`${event.data.street_name} `)
      $('#hour').text(`${time} `)
    }
    if (event.data.type == 'hud_update_info_speedometer') {
      const speed = Math.round(event.data.speed)
      setProgressSpeed(`${speed}`, '.progress-speed');
    }
  })
})