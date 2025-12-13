<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>StageManager</title>
</head>
<body style="margin:0; padding:0; background:#0f172a; font-family:Arial, Helvetica, sans-serif;">

    <!-- Wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a; padding:40px 0;">
        <tr>
            <td align="center">

                <!-- Card -->
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.3);">

                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg, #e11d48, #be123c); padding:24px;">
                            <h1 style="margin:0; color:#ffffff; font-size:24px; letter-spacing:1px;">
                                StageManager
                            </h1>
                            <p style="margin:4px 0 0; color:#ffe4e6; font-size:13px;">
                                Gestion des stages – UPEC
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:32px; color:#1e293b; font-size:15px; line-height:1.6;">
                            
                            <div style="white-space:pre-line;">
                                {!! nl2br(e($content)) !!}
                            </div>

                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding:0 32px;">
                            <hr style="border:none; border-top:1px solid #e5e7eb;">
                        </td>
                    </tr>

                    <!-- Footer -->
                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 32px; font-size:12px; color:#64748b;">
                            <p style="margin:0;">
                                Cet email a été envoyé automatiquement via la plateforme <strong>StageManager</strong>.
                            </p>

                            <p style="margin:8px 0 0;">
                                Envoyé par <strong>Oleg Loukianov</strong>
                            </p>

                            <p style="margin:6px 0 0;">
                                Université Paris-Est Créteil (UPEC)
                            </p>
                        </td>
                    </tr>


                </table>
                <!-- End Card -->

                <!-- Bottom spacing -->
                <div style="height:30px;"></div>

                <!-- Legal -->
                <p style="font-size:11px; color:#94a3b8;">
                    © {{ date('Y') }} StageManager – Tous droits réservés
                </p>

            </td>
        </tr>
    </table>

</body>
</html>
