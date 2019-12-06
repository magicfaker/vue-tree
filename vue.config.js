module.exports = {
    //webpack配置
	configureWebpack: {
	    //关闭 webpack 的性能提示
	    performance: {
		    hints:false
	    },
 
	    //或者
 
	    //警告 webpack 的性能提示
	    performance: {
	    	hints:'warning',
	    	//入口起点的最大体积
	    	maxEntrypointSize: 50000000,
	    	//生成文件的最大体积
	    	maxAssetSize: 30000000,
	    	//只给出 js 文件的性能提示
	    	assetFilter: function(assetFilename) {
	    		return assetFilename.endsWith('.js');
	    	}
	    }
    },
    publicPath:"./",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
    outputDir:"dist",  //打包时生成的生产环境构建文件的目录
    assetsDir: 'public',  // 放置
}