// PAGE 1 -------------------------------------------

export const initiativeTypes = [
  'Community development',
  'Community organizing',
  'Governance',
  'Inter-clinic Groups',
  'LAO/Clinic Committee & consultations',
  'Law reform',
  'Media / communications',
  'Memberships',
  'Other',
  'Outreach',
  'Partners / Network / Community Groups',
  'Policy Advocacy',
  'Professional Development',
  'Public Legal Education',
  'Systemic Advocacy',
  'Training'
]

export const initiativeSubTypes = [
  'Developing coalitions & campaigns',
  'Orientation (board members, staff)',
  'Training attendance',
  'Training organizing',
  'Community event',
  'Community group work',
  'Community needs assessment',
  'Legislative & regulatory analysis',
  'Lobby work',
  'Policy analysis / development',
  'Research',
  'Speaking engagement',
  'Consultation (stakeholders, citizens, communities, agencies)',
  'Relationship / stakeholder building activities',
  'Networking',
  'Stakeholders',
  'Materials development and distribution',
  'Newsletters',
  'Social media work',
  'Traditional media work',
  'Member recruitment (incl. board)',
  'Board / association / committee / conference / meeting / working group / workshop attendance',
  'Board / association / committee / conference / meeting / working group / workshop organizing',
  'Professional development attendance & tracking',
  'Professional development organizing',
  'Clinic planning',
  'Evaluation',
  'Finance work',
  'Funding application',
  'Grant application',
  'HR work',
  'Mailings',
  'Recruitment (staff)',
  'Review / update membership list',
  'Review / update policies / by-laws',
  'Submission prep',
  'Survey (conducting / completing)',
  'Other'
]

export const peopleResourcesTableStructure = [
  { header: 'Name', type: 'text', fieldName: 'name' },
  { header: 'Resource / Partner', type: 'boolean', fieldName: 'resourceType' },
  { header: 'Contact', type: 'email', fieldName: 'contact' },
]


// PAGE 2 -------------------------------------------

export const increasedAbilityOptions = [
  'Contact media',
  'Identify a legal issue',
  'Make contact with appropriate agency',
  'Make referrals',
  'Prevent legal problem escalation',
  'Resolve conflicts',
  'Self-advocacy',
  'Take political action',
  'Use self-help kits, information provided',
]

export const increasedKnowledgeOptions = [
  'Barriers',
  'Benefits',
  'Clinic services',
  'Issues',
  'Justice system',
  'Laws',
  'Legal system',
  'Networking opportunities',
  'Resources',
  'Responsibilities',
  'Rights',
]

export const longTermOutcomesOptions = [
  'Community has increased awareness of justice issues',
  'Increased access to justice',
  'Increased civic participation',
  'Increased community capacity',
  'Increased justice / fairness in the legal system',
  'Increased legal literacy',
  'Increased personal empowerment',
  'Increased social capital',
  'Increased social inclusion',
  'Intended benefit of law',
  'Legal system is more aware of legal needs of low-income people',
  'Poverty reduction',
  'Prevention of homelessness'
]

export const deliverablesTableStructure = [
  { header: 'Deliverable', type: 'text', fieldName: 'deliverable' },
  { header: 'Target Date', type: 'date', fieldName: 'targetDate' }
]

// PAGE 3 -------------------------------------------

export const docketingTableHeaders = [
  'Date', 'Docket Type', 'Time Spent (hours)', 'Details'
]

export const docketingTablePlaceholder = [
  { date: '01/02/2018', type: 'Advocacy', timeSpent: 10, details: 'Details go here'}
]

export const docketTypeOptions = [
  'Advocacy',
  'Attending govt briefing',
  'Board / committee / association / conference / working group / workshop - attendance',
  'Board / committee / association / conference / working group / workshop - organizing',
  'By-law amendments',
  'Clinic operational planning (annual, strategic)',
  'Community development',
  'Community event',
  'Community group work',
  'Community needs assessment',
  'Developing coalitions & campaigns',
  'Evaluation',
  'Event organizing',
  'Funding application',
  'Grant application',
  'Inter-clinic & inter-agency collaboration',
  'legislative & regulator analysis',
  'Lobby work',
  'Materials development & distribution',
  'Media / communications (includes newsletters, brochures, TV, radio)',
  'Networking',
  'Organizational development',
  'Orientation (board, staff)',
  'Other',
  'Partners / network / community groups',
  'Policy analysis / development',
  'Policy maker education',
  'Professional development (staff receiving)',
  'Professional development organizing',
  'Recruitment (staff)',
  'Social media work (Twitter, facebook)',
  'Speaking engagement',
  'Stakeholder consultation',
  'Stakeholder relationship development',
  'Strategic planning',
  'Submission preparation',
  'Survey (conducting / completing)',
  'Training attendance',
  'Training organizing',
]

export const outputsTableHeaders = [
  'Deliverable', 'Target Date', 'Date Completed', 'Comments'
]
