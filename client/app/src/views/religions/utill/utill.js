// Mapping of religions to their festivals
export const religionFestivals = {
  "-None-": [],
   "Canadian Festivals": [
    "Canada Day",
    "New Year",
    "Family Day",
    "Victoria Day",
    "Father's Day",
    "Mother's Day",
    "Thank's giving",
  ],
  Buddhism: ["Lhosar"],
  Hinduism: [
    'Diwali', 'Holi', 'Navratri', 'Janmashtami', 'Rama Navami', 'Makar Sankranti',
    'Pongal', 'Ganesh Chaturthi', 'Durga Puja', 'Raksha Bandhan', 'Karva Chauth', 'Mahashivratri'
  ],
  Sikhism: [
    'Gurpurab', 'Baisakhi', 'Maghi', 'Hola Mohalla', 'Diwali (Bandi Chhor Divas)',
    'Martyrdom of Guru Arjan Dev Ji', 'Martyrdom of Guru Tegh Bahadur Ji',
    "Guru Nanak Jayanti", "Guru Gobind Singh Jayanti", "Guru Granth Sahib Prakash Divas",
    "Vaisakhi", "Lohri", "Thanksgiving", "New Year"
  ],
  Christianity: [
    'Christmas', 'Easter', 'Good Friday', 'Palm Sunday', 'Ash Wednesday',
    'Maundy Thursday', 'Pentecost', "All Saints' Day", 'Ascension Day', 'Epiphany'
  ],
  Islam: [
    'Eid al-Fitr', 'Eid al-Adha', 'Ramadan', 'Laylat al-Qadr',
    'Islamic New Year', 'Milad-un-Nabi', 'Ashura'
  ],
  Judaism: ["Passover"],
  
};

// Religions list
export const religions = Object.keys(religionFestivals);
