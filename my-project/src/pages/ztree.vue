<template>
	<uploader :options="options" class="uploader-example">
		<uploader-unsupport></uploader-unsupport>
		<uploader-drop>
			<p>Drop files here to upload or</p>
			<uploader-btn>select files</uploader-btn>
			<uploader-btn :attrs="attrs">select images</uploader-btn>
			<uploader-btn :directory="true">select folder</uploader-btn>
		</uploader-drop>
		<uploader-list></uploader-list>
	</uploader>
</template>

<script>
    export default {
        data () {
            return {
                options: {
                    target: '//192.168.0.116:8888/user',
                    testChunks: false
                },
                attrs: {
                    accept: 'image/*'
                }
            }
        
    },
mounted: function(){
	this.$nextTick(function () {
		var zTreeObj;
	   // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
		var setting = {};
	   // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
		var zNodes = [
	    {name:"test1     1024MB", open:true, children:[
	    {name:"test1_1"}, {name:"test1_2"}]},
	    {name:"test2", open:true, children:[
	    {name:"test2_1"}, {name:"test2_2"}]}
	    ];
	    $(document).ready(function(){
	    	zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	    });
	})
}
}
	

</script>


