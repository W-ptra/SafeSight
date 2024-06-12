document.addEventListener('DOMContentLoaded', () => {
    let tap = 0;
    let intervalAuto = null;
    let isUseFrontCamera = true;

    const video = document.getElementById("video");
    const audio = document.getElementById("audio");
    const tapping = document.getElementById("tapping");
    const main_page = document.getElementById("main_page");

    let stream;
    let useFrontCamera = true; // Flag to toggle between front and back camera

    function handleSuccess(s) {
        stream = s;
        if (video) {
            video.srcObject = stream;
        } else {
            console.error('Video element not found');
        }
    }

    function handleError(error) {
        console.error('Error accessing media devices.', error);
    }

    function startCamera() {
        if (!video) {
            console.error('Video element not found');
            return;
        }
        const constraints = {
            audio: false,
            video: { facingMode: useFrontCamera ? "user" : "environment" }
        };
        navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
    }

    function stopCamera() {
        if (!video) {
            console.error('Video element not found');
            return;
        }
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
        }
    }

    function switchCamera() {

        if(isUseFrontCamera){
            isUseFrontCamera = false;
        }
        else{
            isUseFrontCamera = true;
        }

        stopCamera();
        useFrontCamera = !useFrontCamera; // Toggle the camera flag
        startCamera();
    }

    function startup(){
        main_page.style = "display: none;";
        tapping.style = "left: 0; right: 0; top: 0; right: 0; display: inherite;";
        startCamera();
        playAudio("GreetingAndInformation");
    }

    if (main_page){
        main_page.addEventListener("click",startup);
    }

    function capturePhotoAndSend() {
        if (!video || !stream) {
            console.error('Video element or stream not available');
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('image', blob, 'image.png');

            fetch('https://backend.wisnuputra.xyz/upload', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text(); // or response.json() if expecting JSON response
                })
                .then(data => {
                    //console.log('Image uploaded successfully:', data);
                    const respondData = JSON.parse(data);
                    //console.log(respondData);
                    const path = respondData.Path;

                    if (path === undefined) return;
                    //console.log(path);

                    audio.src = path;
                    audio.load();
                    audio.play();
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    // Handle error
                });
        }, 'image/png');
    }


    if (tapping) {
        tapping.addEventListener("click", tappings)
    }

    function tappings() {
        tap++;
        if (tap === 1) {
            setTimeout(() => {

                if (tap === 1 && intervalAuto === null) {
                    console.log("opsi 1");
                    playAudio("DetectObjectDanBacaText");
                    capturePhotoAndSend();

                }
                else if (tap === 2) {
                    console.log("opsi 1");
                    function repeat() {
                        capturePhotoAndSend();
                    }

                    if (!intervalAuto) {
                        playAudio("AutoDetectObjectDanBacaText")
                        intervalAuto = setInterval(repeat, 15000);
                    }
                    else {
                        playAudio("BatalkanFitur")
                        clearInterval(intervalAuto);
                        intervalAuto = null;
                    }

                    //console.log("opsi 2");
                }
                else if (tap >= 3) {
                    switchCamera();
                    //console.log(switchCamera);
                    if (isUseFrontCamera) {
                        playAudio("FrontCamera")
                    }
                    else {
                        playAudio("BackCamera")
                    }
                }

                tap = 0;
            }, 500)
        }
    }

    function playAudio(audio_name) {
        audio.src = `./voice/${audio_name}.wav`;
        audio.load();
        audio.play();
    }
});
