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
        }
    }
</script>


