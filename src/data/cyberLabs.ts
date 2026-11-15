// ============================================================
// RAKESH S. — Cyber Labs Data & Configuration
// ============================================================
// HOW TO ADD A NEW LAB:
// 1. Copy one of the sample objects below.
// 2. Assign a unique `id` (e.g. 'net-02').
// 3. Choose a category: 'NETWORK' | 'WEB' | 'LINUX' | 'FORENSICS' | 'CLOUD' | 'CTF'.
// 4. Set status: 'COMPLETED' | 'IN PROGRESS' | 'PLANNED'.
// 5. Fill in title, summary, description, tools, and optional screenshots.
// ============================================================

export type LabCategoryType = 'NETWORK' | 'WEB' | 'LINUX' | 'FORENSICS' | 'CLOUD' | 'CTF';

export type LabStatus = 'COMPLETED' | 'IN PROGRESS' | 'PLANNED';

export interface LabScreenshot {
  url?: string;
  caption: string;
  placeholderText?: string;
}

export interface LabItem {
  id: string;
  category: LabCategoryType;
  title: string;
  status: LabStatus;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  description: string;
  objectives: string[];
  tools: string[];
  keyTakeaways?: string[];
  screenshots?: LabScreenshot[];
  date?: string;
  isSamplePlaceholder: boolean;
}

export interface LabCategoryMeta {
  id: LabCategoryType;
  name: string;
  subtitle: string;
  description: string;
}

export const LAB_CATEGORIES: LabCategoryMeta[] = [
  {
    id: 'NETWORK',
    name: 'NETWORK',
    subtitle: 'Packet analysis, protocol inspection & perimeter defense',
    description:
      'Hands-on network analysis labs focused on traffic inspection, packet capture analysis, firewall configuration, and identifying anomalous network flows.',
  },
  {
    id: 'WEB',
    name: 'WEB',
    subtitle: 'Application security testing & OWASP vulnerabilities',
    description:
      'Web security practice investigating client/server interaction, common web vulnerabilities (OWASP Top 10), authentication flaws, and secure headers.',
  },
  {
    id: 'LINUX',
    name: 'LINUX',
    subtitle: 'System hardening, permissions auditing & bash scripting',
    description:
      'Operating system security labs covering Linux access control, process inspection, log analysis, privilege escalation detection, and baseline hardening.',
  },
  {
    id: 'FORENSICS',
    name: 'FORENSICS',
    subtitle: 'Digital artifact analysis & incident investigation',
    description:
      'Digital forensics and incident response exercises analyzing disk images, memory captures, log timelines, and file system metadata.',
  },
  {
    id: 'CLOUD',
    name: 'CLOUD',
    subtitle: 'Cloud architecture security & IAM governance',
    description:
      'Cloud security experiments exploring least-privilege IAM policies, cloud network isolation, audit logging, and basic misconfiguration auditing.',
  },
  {
    id: 'CTF',
    name: 'CTF',
    subtitle: 'Capture the Flag challenges & defensive problem solving',
    description:
      'Walkthroughs of competitive cybersecurity challenges across cryptography, reverse engineering, web challenges, and defensive puzzle solving.',
  },
];

// NOTE: All entries below are structured sample templates as requested.
// Replace or append with actual completed lab documentation when ready.
export const cyberLabsData: LabItem[] = [
  // ── NETWORK LABS ──
  {
    id: 'net-01',
    category: 'NETWORK',
    title: '[Sample] Wireshark Traffic & Protocol Analysis',
    status: 'IN PROGRESS',
    difficulty: 'Beginner',
    summary:
      'Inspecting TCP 3-way handshakes, DNS queries, and unencrypted protocol traffic within an isolated virtual network.',
    description:
      'In this sample exercise, network packet captures (.pcap) are analyzed to understand protocol handshakes, dissect headers, and identify plain-text transmission vulnerabilities. The lab emphasizes applying display filters in Wireshark to locate specific transmission flows.',
    objectives: [
      'Capture and filter TCP, UDP, and ICMP traffic streams',
      'Analyze the TCP 3-way handshake and connection teardown phases',
      'Inspect DNS query-response latency and anomalies',
      'Follow HTTP packet streams and identify unencrypted credential transmission',
    ],
    tools: ['Wireshark', 'Tcpdump', 'VirtualBox'],
    keyTakeaways: [
      'Display filters drastically accelerate incident isolation in large captures.',
      'Understanding baseline protocol flows is essential before detecting anomalous behavior.',
    ],
    screenshots: [
      {
        caption: 'Sample capture view with TCP display filters applied',
        placeholderText: 'WIRESHARK_FILTER: tcp.flags.syn == 1 && tcp.flags.ack == 0',
      },
      {
        caption: 'Packet header inspection showing TCP sequence numbers',
        placeholderText: 'PACKET_DISSECTOR: Transmission Control Protocol Layer Details',
      },
    ],
    date: '2026',
    isSamplePlaceholder: true,
  },
  {
    id: 'net-02',
    category: 'NETWORK',
    title: '[Sample] Port Scanning & Perimeter Mapping with Nmap',
    status: 'PLANNED',
    difficulty: 'Beginner',
    summary:
      'Safe discovery and service version fingerprinting across designated lab subnet hosts.',
    description:
      'Planned lab to practice non-intrusive host discovery, TCP SYN scanning, UDP port identification, and service banner grabbing against authorized local virtual targets.',
    objectives: [
      'Perform ARP host discovery across a local /24 subnet',
      'Compare TCP Connect scan (-sT) versus SYN stealth scan (-sS)',
      'Detect service versions using standard Nmap NSE scripts',
      'Document discovered listening ports and firewall responses',
    ],
    tools: ['Nmap', 'Zenmap', 'Kali Linux'],
    keyTakeaways: [
      'Firewalls and rate-limiting influence scan accuracy and timing configurations.',
    ],
    screenshots: [
      {
        caption: 'Sample terminal output for Nmap service enumeration',
        placeholderText: '$ nmap -sV -sC -T4 192.168.56.101',
      },
    ],
    date: 'Planned',
    isSamplePlaceholder: true,
  },

  // ── WEB LABS ──
  {
    id: 'web-01',
    category: 'WEB',
    title: '[Sample] OWASP Top 10 Practice & Parameter Tampering',
    status: 'IN PROGRESS',
    difficulty: 'Intermediate',
    summary:
      'Exploring common web vulnerabilities (SQLi, IDOR, XSS) within safe practice environments like DVWA and Juice Shop.',
    description:
      'Structured study of modern web application weaknesses in an offline sandbox. Focuses on analyzing HTTP requests, inspecting request payloads in Burp Suite, and understanding remediation through input validation and parameterized queries.',
    objectives: [
      'Intercept and modify HTTP request headers and parameters',
      'Identify reflected versus stored cross-site scripting (XSS)',
      'Understand how prepared statements neutralize SQL injection',
      'Audit cookie attributes (HttpOnly, Secure, SameSite)',
    ],
    tools: ['Burp Suite Community', 'DVWA', 'OWASP ZAP', 'Firefox DevTools'],
    keyTakeaways: [
      'Client-side validation is easily bypassed; server-side enforcement is mandatory.',
      'Defense-in-depth requires contextual output encoding and CSP headers.',
    ],
    screenshots: [
      {
        caption: 'Burp Suite HTTP proxy request intercept & repeater inspection',
        placeholderText: 'POST /vulnerabilities/sqli/ HTTP/1.1\nHost: dvwa.local\nContent-Type: application/x-www-form-urlencoded',
      },
    ],
    date: '2026',
    isSamplePlaceholder: true,
  },
  {
    id: 'web-02',
    category: 'WEB',
    title: '[Sample] Secure Header Auditing & TLS Configuration',
    status: 'PLANNED',
    difficulty: 'Beginner',
    summary:
      'Auditing HTTPS configurations, SSL/TLS ciphers, and security response headers (HSTS, CSP).',
    description:
      'Exercise evaluating server header hygiene, certificate validity, and browser protection mechanisms against clickjacking and MIME-type sniffing.',
    objectives: [
      'Evaluate Content Security Policy (CSP) directives',
      'Enforce Strict-Transport-Security (HSTS) with preloading',
      'Inspect X-Frame-Options and X-Content-Type-Options implementations',
    ],
    tools: ['testssl.sh', 'cURL', 'OpenSSL'],
    keyTakeaways: [
      'Proper headers mitigate entire classes of browser-based client attacks.',
    ],
    date: 'Planned',
    isSamplePlaceholder: true,
  },

  // ── LINUX LABS ──
  {
    id: 'linux-01',
    category: 'LINUX',
    title: '[Sample] Linux File System Permissions & SUID Auditing',
    status: 'COMPLETED',
    difficulty: 'Intermediate',
    summary:
      'Comprehensive audit of permission bits, special permissions (SUID/SGID), and sudo configurations.',
    description:
      'This foundational Linux lab covers the Linux permission model (rwx bits, octal representation, sticky bits), locating misconfigured SUID binaries, and analyzing secure sudoers configuration to adhere to least-privilege principles.',
    objectives: [
      'Query and interpret standard and POSIX extended file ACLs',
      'Identify binaries with SUID/SGID bits set using the find command',
      'Audit /etc/sudoers for unsafe wildcards and NOPASSWD directives',
      'Implement restricted user accounts with minimal read privileges',
    ],
    tools: ['Ubuntu Server', 'Bash', 'Auditd', 'OpenSSH'],
    keyTakeaways: [
      'SUID files with write permissions or insecure PATH resolutions represent high security risks.',
      'Least privilege should govern standard user system service access.',
    ],
    screenshots: [
      {
        caption: 'Sample terminal command finding all SUID root binaries',
        placeholderText: '$ find / -perm -4000 -type f -exec ls -ld {} \\; 2>/dev/null',
      },
    ],
    date: '2026',
    isSamplePlaceholder: true,
  },
  {
    id: 'linux-02',
    category: 'LINUX',
    title: '[Sample] SSH Bastion Hardening & Fail2ban Configuration',
    status: 'IN PROGRESS',
    difficulty: 'Beginner',
    summary:
      'Hardening OpenSSH daemon settings and setting up rate-limiting against automated brute force attempts.',
    description:
      'Hardening an administrative Linux instance by disabling root SSH login, changing default ports, enforcing Ed25519 public key authentication, and configuring Fail2ban to ban aggressive IP addresses.',
    objectives: [
      'Generate and distribute secure Ed25519 SSH keypairs',
      'Configure sshd_config to disallow password auth and PermitRootLogin',
      'Setup Fail2ban jail configurations for sshd authentication logs',
      'Verify iptables/nftables automated drops during testing',
    ],
    tools: ['OpenSSH', 'Fail2ban', 'iptables', 'Debian'],
    keyTakeaways: [
      'Public-key only authentication eliminates 99% of noisy credential guessing attacks.',
    ],
    date: '2026',
    isSamplePlaceholder: true,
  },

  // ── FORENSICS LABS ──
  {
    id: 'forensics-01',
    category: 'FORENSICS',
    title: '[Sample] Memory Acquisition & Artifact Extraction with Volatility',
    status: 'PLANNED',
    difficulty: 'Advanced',
    summary:
      'Acquiring raw RAM captures and inspecting active processes, network sockets, and loaded modules.',
    description:
      'Planned deep-dive into digital forensics using Volatility 3 to extract forensic evidence from memory dumps, including running processes, hidden handles, injected code segments, and open network sockets.',
    objectives: [
      'Analyze memory images to identify the target OS kernel profile',
      'List active and terminated processes with pslist and pstree',
      'Extract command line arguments passed to suspected processes',
      'Investigate established network sockets from memory structures',
    ],
    tools: ['Volatility 3', 'FTK Imager', 'Autopsy'],
    keyTakeaways: [
      'Volatile memory contains critical evidence that never touches disk.',
    ],
    date: 'Planned',
    isSamplePlaceholder: true,
  },
  {
    id: 'forensics-02',
    category: 'FORENSICS',
    title: '[Sample] Disk Image Analysis & Deleted File Recovery',
    status: 'IN PROGRESS',
    difficulty: 'Intermediate',
    summary:
      'Mounting forensic disk images in read-only mode and performing timeline analysis with Autopsy.',
    description:
      'Investigating a simulated compromised workstation disk image. Verifying MD5/SHA256 checksum integrity, carving unallocated space, and building super-timelines from filesystem metadata.',
    objectives: [
      'Compute cryptographic hashes to guarantee chain of custody',
      'Carve deleted documents from unallocated clusters',
      'Extract browser history and USB insertion artifacts from system logs',
    ],
    tools: ['Autopsy', 'Sleuth Kit (TSK)', 'Guymager'],
    keyTakeaways: [
      'Maintaining hash verification at every step preserves evidence admissibility.',
    ],
    screenshots: [
      {
        caption: 'Sample forensic timeline visualization in Autopsy',
        placeholderText: 'EVIDENCE_TREE: /Partition 2/Users/Target/AppData/Roaming',
      },
    ],
    date: '2026',
    isSamplePlaceholder: true,
  },

  // ── CLOUD LABS ──
  {
    id: 'cloud-01',
    category: 'CLOUD',
    title: '[Sample] Cloud IAM Least Privilege & Role Separation',
    status: 'PLANNED',
    difficulty: 'Intermediate',
    summary:
      'Designing strict role-based access policies and monitoring administrative activities in the cloud.',
    description:
      'Hands-on planning lab exploring cloud identity governance: creating custom IAM roles with minimum required permissions, enforcing multi-factor authentication (MFA), and setting up CloudTrail audit alerts for sensitive policy modifications.',
    objectives: [
      'Replace overly permissive wildcard (*) actions with targeted API grants',
      'Establish assume-role workflows with temporary security credentials',
      'Implement multi-factor authentication enforcement for administrative tasks',
      'Configure log ingestion for policy change alerting',
    ],
    tools: ['AWS Free Tier / LocalStack', 'IAM Policy Simulator', 'CloudTrail'],
    keyTakeaways: [
      'Over-privileged service accounts are among the top entry vectors in cloud incidents.',
    ],
    date: 'Planned',
    isSamplePlaceholder: true,
  },
  {
    id: 'cloud-02',
    category: 'CLOUD',
    title: '[Sample] S3 Bucket Hardening & Public Access Remediation',
    status: 'PLANNED',
    difficulty: 'Beginner',
    summary:
      'Auditing object storage configurations, bucket policies, and default encryption.',
    description:
      'Simulating cloud storage security checks: enabling S3 Block Public Access, configuring bucket-level KMS encryption, and evaluating bucket policies to prevent unintentional public data leaks.',
    objectives: [
      'Audit existing bucket ACLs and policies for public read/write permissions',
      'Enable server-side encryption with KMS customer-managed keys',
      'Implement bucket lifecycle rules and access logging',
    ],
    tools: ['AWS CLI', 'ScoutSuite', 'Prowler (Simulated)'],
    keyTakeaways: [
      'Automated guardrails and service control policies prevent accidental exposure.',
    ],
    date: 'Planned',
    isSamplePlaceholder: true,
  },

  // ── CTF LABS ──
  {
    id: 'ctf-01',
    category: 'CTF',
    title: '[Sample] OverTheWire Bandit: Linux Security Challenges',
    status: 'COMPLETED',
    difficulty: 'Beginner',
    summary:
      'Solving command-line challenges focusing on file searching, compression, rot13, and SSH tunnels.',
    description:
      'Structured practice walkthrough through OverTheWire Bandit levels 0-15. Focuses on command-line proficiency, decoding base64/hex streams, handling hidden files, and manipulating file descriptors.',
    objectives: [
      'Navigate multi-layer compressed archives (tar, gzip, bzip2, xz)',
      'Inspect hidden dotfiles, human-readable files, and specific file sizes',
      'Decrypt Caesar cipher and ROT13 encoded strings using tr',
      'Establish passwordless SSH authentication across non-standard ports',
    ],
    tools: ['Bash', 'OpenSSH', 'GnuPG', 'xxd'],
    keyTakeaways: [
      'Mastery of core Unix utilities enables rapid pivoting and troubleshooting in security labs.',
    ],
    screenshots: [
      {
        caption: 'Sample terminal session piping through base64 and rot13 filters',
        placeholderText: '$ cat data.txt | tr \'A-Za-z\' \'N-ZA-Mn-za-m\'',
      },
    ],
    date: '2026',
    isSamplePlaceholder: true,
  },
  {
    id: 'ctf-02',
    category: 'CTF',
    title: '[Sample] PicoCTF Cryptography & Encoding Walkthroughs',
    status: 'IN PROGRESS',
    difficulty: 'Beginner',
    summary:
      'Solving beginner crypto challenges: substitution ciphers, modular arithmetic, and RSA basics.',
    description:
      'Walkthrough documentation for cryptography fundamentals: frequency analysis, XOR manipulation with Python, and basic RSA public exponent mathematical intuition.',
    objectives: [
      'Understand ASCII, UTF-8, and hexadecimal representation differences',
      'Implement single-byte XOR decryption scripts in Python',
      'Solve modular inverse equations for simple RSA parameters',
    ],
    tools: ['Python 3', 'CyberChef', 'SageMath'],
    keyTakeaways: [
      'XOR is reversible: cipher XOR key = plaintext; knowing either yields the other.',
    ],
    date: '2026',
    isSamplePlaceholder: true,
  },
];
