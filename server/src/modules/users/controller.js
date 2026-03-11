const service = require('./service');
const nodemailer = require('nodemailer');
const ExcelJS = require('exceljs');

async function getUsers(req, res, next) {
  try {
    const users = await service.getUsers();
    res.json(users);
  } catch (err) { next(err); }
}
async function createUser(req, res, next) {
  try {
    const userData = req.body;
    const result = await service.createUser(userData);

    if (result && result.insertId) {
      return res.status(201).json({ message: "User created", userId: result.insertId });
    }
    // fallback if service returns something unexpected
    return res.status(500).send("Failed to create user");
  } catch (err) {
    next(err);
  }
}

async function sendEmail(req, res, next) {

  try {
    const path = require('path');
    const email = req.body.email;
    const userId = req.body.userId;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailLogo = path.join(__dirname, '../../..', 'assets/images/mail_logo.png');
    const mailDate = path.join(__dirname, '../../..', 'assets/images/mail_date.png');
    const x = path.join(__dirname, '../../..', 'assets/images/x.png');

    const html = `
  <html>
  <body style="margin:0;padding:10px;font-family:Arial, Helvetica, sans-serif;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <!-- Container -->
          <table role="presentation" width="500" cellpadding="0" cellspacing="0" style="max-width:500px;border:1px solid #e6e6e6;">
            <tr>
              <td style="padding:10px;">
                <!-- Hero image (embedded by cid) -->
                <img src="cid:mailLogo" width="100%" style="display:block;border:0;outline:none;text-decoration:none;" alt="hero" />
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 40px 32px;text-align:center;">
                <h2 style="margin:0 0 12px 0;font-size:20px;line-height:1.2;color:#111;">
                ${!userId ? 'ท่านได้ลงทะเบียนเข้าร่วมกิจกรรม' : 'ยินดีด้วย ท่านได้รับสิทธิ์ Fan Zone !'}
                  
                </h2>

                <h1 style="margin:6px 0 18px 0;font-size:22px;line-height:1.1;color:#000;">
                  MAYBELLINE NEWYORK :<br/>
                  BOBA BOOST SQUARE
                </h1>

                <p style="margin:0 0 18px 0;font-size:14px;color:#333;line-height:1.4;">
                  ${!userId ? 'โปรดติดตามประกาศรายชื่อผู้ที่ได้รับสิทธิ์ <strong>FAN ZONE</strong> และลำดับการยืนใน FAN ZONE ในงาน “BOBA BOOST SQUARE” ผ่านทาง' : 'โปรดติดตาม ลำดับการยืนใน FAN ZONE ในงาน “BOBA BOOST SQUARE” ผ่านทาง'}
                  
                </p>
                <div style="text-align:center; margin-top:10px;">
                  <img src="cid:x"
                      alt="twitter"
                      width="30" height="30"
                      style="display:inline-block;vertical-align:middle;border:0;outline:none;text-decoration:none;" />
                  <span style="display:inline-block;vertical-align:middle;font-weight:bold;margin-left:6px;">: @MAYBELLINE_TH</span>
                </div>

                <div style="margin-top:20px;">
                  <img src="cid:mailDate" width="100%" style="display:block;border:0;outline:none;text-decoration:none;" alt="mail_date" />
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

    const mailOptions = {
      from: `"no-reply@MAYBELLINENEWYORK.com" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `MAYBELLINE NEWYORK : BOBA BOOST SQUARE - ${!userId ? 'ลงทะเบียนสำเร็จ' : 'ขอแสดงความยินดี'}`,
      text: `${!userId ? 'คุณได้ลงทะเบียนเข้าร่วมกิจกรรม' : 'คุณได้รับสิทธิ์ Fan Zone'} MAYBELLINE NEWYORK : BOBA BOOST SQUARE. ดูอีเมลฉบับเต็มเพื่อรายละเอียดและภาพประกอบ.`,
      html,
      attachments: [
        {
          filename: 'mail_logo.png',
          path: mailLogo,
          cid: 'mailLogo'
        },
        {
          filename: 'mail_date.png',
          path: mailDate,
          cid: 'mailDate'
        },
        {
          filename: 'x.png',
          path: x,
          cid: 'x'
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    if (userId) {
      await allowFanZone(userId);
    }

    return res.status(200).send("Email sent successfully");
  } catch (err) {
    next(err);
  }
}


async function allowFanZone(userId) {
  try {

    const result = await service.allowFanZone(userId);

    if (result && result.affectedRows > 0) {
      return "Not update";
    }

    return result;
  } catch (err) {

    return err;
  }
}

async function exportExcel(req, res, next) {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Report');

    sheet.columns = [
      { header: '#', key: 'userId', width: 6 },
      { header: 'First Name', key: 'firstName', width: 20 },
      { header: 'Last Name', key: 'lastName', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 18 },
      { header: 'Register', key: 'registerAt', width: 15 },
      { header: 'Fan Zone', key: 'zoneName', width: 15 },
      { header: 'สิทธิ์ Fan Zone', key: 'isFanZone', width: 18 },
      { header: 'Timestamp', key: 'createdAt', width: 25 }
    ];

    const users = await service.getUsers();

    users.forEach(row => {
      row.isFanZone = row.isFanZone ? "ได้รับสิทธิ์" : "ไม่ได้รับสิทธิ์"
      sheet.addRow(row)
    });

    sheet.getRow(1).font = { bold: true };
    sheet.getColumn(6).alignment = { horizontal: 'left' };
    sheet.getColumn(9).alignment = { horizontal: 'left' };

    res.setHeader('Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');

    await workbook.xlsx.write(res);

    res.end();
  } catch (err) {
    return res.status(500).message("Have a trouble to export");
  }
}

module.exports = {
  getUsers,
  createUser,
  sendEmail,
  exportExcel
};