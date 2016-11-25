# health project 

###这是用angular1写的一个后台管理系统

###为什么不用webpack打包js
   不是用cmd模式编写的代码，不支持webpack打包，只好退而求次使用gulp

###为什么要使用webpack打包css
   使用webpack打包css、图片和字体对应的css里面引用的图片和字体等静态资源也回一起打包过来并且css里面的引用文件也会跟着修改。

###webpack 打包css注意事项
   1、引用extract-text-webpack-plugin插件

   2、在打包字体文件的时候出错，原因是字体文件的方式有一点点特殊后面会带一串时间戳，需要特别匹配到，所以正则匹配的时候要注意一点 test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,