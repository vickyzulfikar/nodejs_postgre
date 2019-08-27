const express		= require('express');
const bodyParser	= require('body-parser');
const {Client} 		= require ('pg');
const app 			= express();

app.use(bodyParser.json());

// setting koneksi ========================================================================================
const conn = new Client({ // Client di ambil dari atas
				user : "postgres",
				password : "1234",
				host : "localhost",
				port : 5432,
				database : "nodejs_postgre"
});

// connect ke database
conn.connect((err) =>{
	if (err) throw err;
	console.log('Connected Succesfully...');
});

// tesing web server
app.get('/', (req,res)=>{
	res.end("Coba");
});

// tampilin data
app.get('/api/siswa/show', (req,res)=>{
	let sql = "SELECT id, nama_lengkap, TO_CHAR(tanggal_lahir, 'dd-mm-yyyy') tanggal_lahir, alamat FROM siswa";
	query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({result:results.rows}));
	});
});

// by id
app.get('/api/siswa/show/:id', (req,res)=>{
	let sql = "SELECT id, nama_lengkap, TO_CHAR(tanggal_lahir, 'dd-mm-yyyy') tanggal_lahir, alamat FROM siswa WHERE id="+req.params.id;
	query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(JSON.stringify({result:results.rows}));
	});
});

// tambah data
app.post('/api/siswa/tambah', (req,res)=>{
	let sql = "INSERT INTO siswa (nama_lengkap, tanggal_lahir, alamat) VALUES ('"+req.body.nama_lengkap+"','"+req.body.tanggal_lahir+"','"+req.body.alamat+"')";
	query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send("Data berhasil ditambahkan");
	});
});

// update data
app.put('/api/siswa/edit/:id', (req,res)=>{
	let sql = "UPDATE Siswa SET nama_lengkap='"+req.body.nama_lengkap+"', tanggal_lahir='"+req.body.tanggal_lahir+"', alamat='"+req.body.alamat+"' WHERE id="+req.params.id;
	query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send("Data berhasil diupdate");
	});
});

// delete data
app.delete('/api/siswa/delete/:id', (req,res)=>{
	let sql = "DELETE FROM siswa WHERE id="+req.params.id;
	query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send("Data berhasil dihapus");
	});
});

app.listen(8000, () => {
	console.log('Server is running at port: 8000');
});