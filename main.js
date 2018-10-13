const socket = io('http://localhost:3000');


function openStream() {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideo, stream) {
    const video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.onloadedmetadata = () => {
        video.play();
    }
}

const peer = new Peer({ key: 'lwjd5qra8257b9' });

peer.on('open', (id) => {
    $('#your-id').append(id);
});

// caller
$('#call').click(function () {
    const id = $('#id').val();
    openStream().then(stream => {
        playStream('localStream', stream);
        const call = peer.call(id, stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    }).catch((error) => console.log(error));
});

peer.on('call', (call) => {
    openStream().then(stream => {
        call.answer(stream);
        playStream('localStream', stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });

});






