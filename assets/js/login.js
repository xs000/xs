$(function () {
  $("#link-reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link-login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 从layui中获取 form对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过 form.verify()函数自定义对象
  form.verify({
    //   自定义一个pwd检验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //   检验两次密码是否一致
    repwd: function (value) {
      //   通过形参拿到确认密码框中的内容
      //   还需要拿到密码框中的内容
      //   然后进行一次等于的判断
      //   如果判断失败，则return一个提示消息
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
      repassword: $("#form_reg [name=repassword]").val(),
    };
    $.post("/api/reg", data, function (res) {
      if (res.code !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功,请登录");
      $("#link-login").click();
    });
  });
  $("#form-login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.code !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("登陆成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
