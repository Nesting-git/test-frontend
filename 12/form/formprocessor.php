<?php

$emailSubject = "Новая заявка с merk.by";

$emailBody = "\n\nДанные по заявке:\n\n";
$headers = 'From: Merk' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

foreach($_POST['fields'] as $key => $val)
{
	$emailBody .= "$key: $val\n\n";
}

$emailBody .="Заполнена форма: " . $_POST["name"] ."\r\n";
$emailBody .= "Url страницы: " . $_POST['source'];

$resultOfMail = mail("lp@merk.by", $emailSubject, $emailBody, $headers);
$resultOfMail = mail("irina.blagun@gmail.com", $emailSubject, $emailBody, $headers);
$resultOfMail = mail("irina.blagun@merk.by", $emailSubject, $emailBody, $headers);
$resultOfMail = mail("amomerk@gmail.com", $emailSubject, $emailBody, $headers);


if ($resultOfMail) {
	echo '{"success":true}';
} else {
	echo '{"success":false}';
}
?>
