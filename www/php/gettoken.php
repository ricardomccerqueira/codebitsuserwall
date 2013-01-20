<?php
	header('Content-type: application/json');
	$service = 'https://services.sapo.pt/Codebits/gettoken';
	$params  = "user=r0ckf3l3r@gmail.com&password=ricardomccerqueira";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $service);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 120);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
	$json = curl_exec($ch);
	curl_close($ch);
	
	echo $json;
?>