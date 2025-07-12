export function formatUptime(ms: number): string {
    const diffSec = Math.floor(ms / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMillis = ms % 1000;

    return (
        (diffDays > 0 ? `**${diffDays}**d, ` : '') +
        (diffHours % 24 > 0 ? `**${diffHours % 24}**h, ` : '') +
        (diffMin % 60 > 0 ? `**${diffMin % 60}**m, ` : '') +
        (diffSec % 60 > 0 ? `**${diffSec % 60}**s, ` : '') +
        (diffMillis > 0 ? `**${diffMillis}**ms` : '')
    ).trim();
}

export function timediffFunction(time2: any, time1: number) {
    const diffMs = time2 - time1;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMillis = diffMs % 1000;

    const formattedTimeDiff = (diffDays > 0 ? `**${diffDays}**d, ` : "") +
        (diffHours % 24 > 0 ? `**${diffHours % 24}**h, ` : "") +
        (diffMin % 60 > 0 ? `**${diffMin % 60}**m, ` : "") +
        (diffSec % 60 > 0 ? `**${diffSec % 60}**s, ` : "") +
        (diffMillis > 0 ? `**${diffMillis}**ms` : "");
    return formattedTimeDiff;
}