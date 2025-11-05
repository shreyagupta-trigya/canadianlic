exports.getAboutPage = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>about page</h1>');
    res.end();
};

exports.getContactPage = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>contact page</h1>');
    res.end();
};

exports.getDefaultPage = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>default page</h1>');
    res.end();
};
