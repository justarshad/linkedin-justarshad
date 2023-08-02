const timeHandler = (time) => {
    const currentTime = new Date().getTime();
    const timeDiffrence = Math.floor((currentTime - time) / 1000);

    if (timeDiffrence < 60) {
        return `${timeDiffrence} sec ago`;
    }
    else if (timeDiffrence < 3600) {
        return `${Math.floor(timeDiffrence / 60)} min ago`;
    }
    else if (timeDiffrence < 86400) {
        return `${Math.floor(timeDiffrence / 3600)} hour ago`;
    }
    else if (timeDiffrence < 2592000) {
        return `${Math.floor(timeDiffrence / 86400)} days ago`;
    }
    else if (timeDiffrence < 31104000) {
        return `${Math.floor(timeDiffrence / 2592000)} months ago`;
    }
    else {
        return `${Math.floor(timeDiffrence / 31104000)} years ago`;
    }
}

export default timeHandler;