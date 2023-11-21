const express = require('express');
const dmx = require("enttec-open-dmx-usb");
const dmxDevice = dmx.EnttecOpenDMXUSBDevice;
const app = express();
const port = 5555;
let device;

// Initialize DMX devices
(async () => {
    device = new dmxDevice(await dmxDevice.getFirstAvailableDevice());
    device.setChannels({
        [1]: 255,
        [2]: 0,
        [3]: 0,
        [4]: 0,
        [9]: 255,
        [10]: 0,
        [11]: 0,
        [12]: 0,
    });
})();

// Route for handling GET request with 'color' parameter
app.get('/', (req, res) => {
    const color = req.query.color;
    if (color) {
        switch (color) {
            case 'red':
                device.setChannels({
                    [1]: 255,
                    [2]: 255,
                    [3]: 0,
                    [4]: 0,
                    [9]: 255,
                    [10]: 255,
                    [11]: 0,
                    [12]: 0,
                });
                break;
            case 'green':
                device.setChannels({
                    [1]: 255,
                    [2]: 0,
                    [3]: 255,
                    [4]: 0,
                    [9]: 255,
                    [10]: 0,
                    [11]: 255,
                    [12]: 0,
                });
                break;
            case 'blue': 
                device.setChannels({
                    [1]: 255,
                    [2]: 0,
                    [3]: 0,
                    [4]: 255,
                    [9]: 255,
                    [10]: 0,
                    [11]: 0,
                    [12]: 255,
                });
                break;
            case 'white':    
                device.setChannels({
                    [1]: 255,
                    [2]: 0,
                    [3]: 0,
                    [4]: 0,
                    [5]: 255,
                    [9]: 255,
                    [10]: 0,
                    [11]: 0,
                    [12]: 0,
                    [13]: 255,
                });
                break;
            case 'off':
                device.setChannels({
                    [1]: 0,
                    [2]: 0,
                    [3]: 0,
                    [4]: 0,
                    [5]: 0,
                    [9]: 0,
                    [10]: 0,
                    [11]: 0,
                    [12]: 0,
                    [13]: 0,
                });
                break;
        }
        res.send(`color: ${color}`);
    } else {
        res.send('A color (color) parameter is required.');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});