window.onload = function () {

  $('#btn2').click(function() {
    $.ajax({
      url: '/student',
      data: {},
      success:function (res){
        if (res.success) {
          renderStudent (res.data)
        }
      }
    })
  })

  function renderStudent (data) {
    var str = ''
    data.forEach(function(item) {
      str += '<li>姓名：'+item.name+'，性别：'+item.sex+'，年龄：'+item.age+'</li>'
    })
    $('#studentList').html(str)
  }

  $('#btn3').click(function() {
    $.ajax({
      url: '/graphql',
      data: {
        query: `query{
          students{
            _id
            name
            sex
            age
          }
        }`
      },
      success:function (res){
        renderStudent (res.data.students)
      }
    })
  })

}