$(function () {
  geyUserInfo();
  function geyUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      // Headers 请求头配置对象
      Headers: {
        Authorization: localStorage.getItem("token") || "",
      },
      success: function (res) {
        if (res.code !== 0) {
          return layui.layer.msg("获取用户信息失败");
        }
        renderAvatar(res.data);
      },
    });
  }

  // 渲染用户头像
  function renderAvatar(user) {
    var name = user.nickname || user.username;
    //   设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //   渲染用户头像
    if (user.user_pic !== null) {
      //   渲染图片头像
      $(".layui-nav-img").attr("src", user.user_pic).show();
      $(".text-avatar").hide();
    } else {
      // 渲染文本头像
      $(".layui-nav-img").hide();
      var first = name[0].toUpperCase();
      $(".text-avatar").html(first).show();
    }
  }
  var layer = layui.layer;

  // 点击按钮，实现退出功能
  $("#btnLogout").on("click", function () {
    // 提示用户是否确认退出
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem("token");
        // 2. 重新跳转到登录页面
        location.href = "/就业班/大事件项目/login.html";

        // 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});
