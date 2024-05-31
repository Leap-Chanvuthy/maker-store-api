const guest = async (req , res) => {
    res.send('Hello this is guest route')
}

const admin = async (req , res) => {
    res.send('Hello welcome to admin dashboard');
}

module.exports = {guest , admin};