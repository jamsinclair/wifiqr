'use strict';
const form = document.querySelector('form');
const passwordInput = document.querySelector('input[name=pass]');
const protocolSelector = document.querySelector('select');

const getWifiCode = (ssid, pass, protocol, hidden) => {
	const escape = (str = '') => str.replace(/([\\;,:"])/g, '\\$1');
	let code = `WIFI:S:${escape(ssid)};T:${escape(protocol)};`;
	if (protocol !== 'nopass') {
		code += `P:${escape(pass)};`;
	}

	if (hidden === 'true') {
		code += 'H:true;';
	}

	return code + ';';
};

const updatePasswordValidation = protocol => {
	passwordInput.required = protocol === 'nopass' ? '' : 'required';
	passwordInput.disabled = protocol === 'nopass' ? 'disabled' : '';
	passwordInput.minLength = protocol === 'WEP' ? '5' : '8';
};

const handleProtocolChange = event => {
	updatePasswordValidation(event.target.value);
};

updatePasswordValidation(protocolSelector.value);
protocolSelector.addEventListener('change', handleProtocolChange);
protocolSelector.addEventListener('blur', handleProtocolChange);

form.addEventListener('submit', event => {
	event.preventDefault();
	const formData = new FormData(form);
	// eslint-disable-next-line no-useless-call
	const code = getWifiCode.call(null, ...formData.values());
	QRCode.toDataURL(code, {width: 800, height: 800})
		.then(dataUri => {
			document.querySelector('.code').innerHTML = `<img src=${dataUri}> alt="Generated Wifi QR Code">`;
			document.querySelector('.output').style = 'display: block';
		});
});

document.querySelector('.print').addEventListener('click', () => window.print());
