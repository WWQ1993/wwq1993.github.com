seajs.config({
	// 基础路径
	base: '../',
	// 路径配置
	paths: {
	  'js': '../js',
	  'css': '../css',
	  'dist' : './dist'
	},
	// 别名配置
	alias: {
	  'jquery': 'js/jquery',
	  'index' :'js/index'
	},
	//预先加载
	preload: [

	],
	//map,批量更新时间戳
	// map: [[/^(.*\.(?:css|js))(.*)$/i, '$1?v=20151103']],
	// 文件编码
	charset: 'utf-8'
})
