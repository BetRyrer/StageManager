<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>{{ $mailTitle ?? 'StageManager' }}</title>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, Helvetica, sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a; margin:0; padding:40px 0;">
        <tr>
            <td align="center">

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.30);">

                    {{-- Header --}}
                    <tr>
                        <td style="background:linear-gradient(135deg, #e11d48, #be123c); padding:28px 32px;">

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="left" style="vertical-align:middle;">
                                        @if(!empty($logoUrl))
                                            <img src="{{ $logoUrl }}" alt="Logo StageManager" style="max-height:52px; display:block; margin-bottom:12px;">
                                        @endif

                                        <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700; letter-spacing:0.4px;">
                                            StageManager
                                        </h1>

                                        <p style="margin:6px 0 0; color:#ffe4e6; font-size:13px; line-height:1.5;">
                                            Gestion des stages – UPEC
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    {{-- Intro title --}}
                    <tr>
                        <td style="padding:32px 32px 12px 32px;">
                            @if(!empty($mailTitle))
                                <h2 style="margin:0; color:#111827; font-size:24px; line-height:1.3; font-weight:700;">
                                    {{ $mailTitle }}
                                </h2>
                            @endif
                        </td>
                    </tr>

                    {{-- Content --}}
                    <tr>
                        <td style="padding:8px 32px 8px 32px; color:#1e293b; font-size:15px; line-height:1.7;">

                            <p style="margin:0 0 18px 0; color:#111827; font-size:15px; line-height:1.7;">
                                Bonjour {{ $student->prenom ?? 'à vous' }},
                            </p>

                            {!! $content !!}

                            @if(!empty($buttonText) && !empty($buttonUrl))
                                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px 0;">
                                    <tr>
                                        <td align="center" style="border-radius:10px; background-color:#be123c;">
                                            <a href="{{ $buttonUrl }}"
                                               style="display:inline-block; padding:14px 24px; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; border-radius:10px;">
                                                {{ $buttonText }}
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            @endif

                        </td>
                    </tr>

                    {{-- Signature block --}}
                    <tr>
                        <td style="padding:20px 32px 8px 32px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px;">
                                <tr>
                                    <td style="padding:18px 20px;">
                                        <p style="margin:0 0 10px 0; color:#111827; font-size:15px; font-weight:700;">
                                            Cordialement,
                                        </p>

                                        <p style="margin:0; color:#334155; font-size:14px; line-height:1.7;">
                                            <strong>{{ $senderName ?? 'Oleg Loukianov' }}</strong><br>
                                            {{ $senderRole ?? 'Service des stages' }}<br>
                                            {{ $senderOrganization ?? 'Université Paris-Est Créteil (UPEC)' }}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Divider --}}
                    <tr>
                        <td style="padding:24px 32px 0 32px;">
                            <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;">
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="padding:20px 32px 28px 32px;">
                            <p style="margin:0 0 8px 0; color:#64748b; font-size:12px; line-height:1.7;">
                                Cet email a été envoyé automatiquement via la plateforme <strong>StageManager</strong>.
                            </p>

                            @if(!empty($footerText))
                                <p style="margin:0 0 8px 0; color:#64748b; font-size:12px; line-height:1.7;">
                                    {{ $footerText }}
                                </p>
                            @endif

                            <p style="margin:0; color:#94a3b8; font-size:11px; line-height:1.7;">
                                © {{ date('Y') }} StageManager – Tous droits réservés
                            </p>
                        </td>
                    </tr>

                </table>

                <div style="height:24px;"></div>

            </td>
        </tr>
    </table>

</body>
</html>