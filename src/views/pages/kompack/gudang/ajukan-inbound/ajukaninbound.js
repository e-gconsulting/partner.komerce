$('.btn').click(() => {
  const lable = $('.btn').text().trim()

  if (lable == 'Hide') {
    $('.btn').text('Show')
    $('.myText').hide()
  } else {
    $('.btn').text('Hide')
    $('.myText').show()
  }
})
