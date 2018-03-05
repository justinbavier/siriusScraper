/*==============================================================//
Cross reference channel numbers with their URL id's.
We'll need to build URLs to iterate over for each API call.

For some reason, some are numeric, some are strings.

CLIENT'S PRIORITY ORDER:
	98, 99, 97, 96, 94, 95

//==============================================================*/
module.exports = {
	94: '9408',							// Comedy greats
	95: '9356',							// Comedy Central radio
	96: '9469',							// Kevin Hart's Laugh Out Loud
	97: 'bluecollarcomedy',	// Round-up
	98: 'laughbreak',				// Laugh USA
	99: 'rawdog',						// I'd feel weird typing this again
};