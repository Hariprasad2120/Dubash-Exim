import { CourseModule } from '../types';

export const courseModules: CourseModule[] = [
  {
    id: 'module-1',
    moduleNumber: '01',
    title: 'Customs Procedures & ICEGATE',
    category: 'ICEGATE / PORTALS',
    topics: [
      'Bills of Entry & Shipping Bills preparation and validation',
      'e-Sanchit document uploading, digital signatures (DSC), and IRN generation',
      'Duty Drawback schemes, MOOWR, and EPCG/Advance Authorization exemptions'
    ],
    keySkill: 'Practical online customs portal navigation & document filing without agent dependency.'
  },
  {
    id: 'module-2',
    moduleNumber: '02',
    title: 'Incoterms 2020 & Risk Allocation',
    category: 'INCOTERMS 2020',
    topics: [
      'EXW, FOB, CIF, and DDP comparative legal liabilities',
      'Detailed Buyer / Seller responsibilities, delivery hand-off, and costs split',
      'Maritime freight carriage insurance & marine risk allocation analysis'
    ],
    keySkill: 'Selecting the right trade terms to protect profit margins and mitigate transit liability.'
  },
  {
    id: 'module-3',
    moduleNumber: '03',
    title: 'Trade Finance & Banking',
    category: 'BANKING & FINANCE',
    topics: [
      'Letters of Credit (LC) mechanics: Irrevocable, Confirmed, Transferable',
      'ECGC credit insurance policies, buyer underwriting & risk mitigation',
      'FEMA guidelines, EDPMS / IDPMS bank closures, and payment terms (DA/DP)'
    ],
    keySkill: 'Structuring secure international trade payment methods that eliminate bad debts.'
  },
  {
    id: 'module-4',
    moduleNumber: '04',
    title: 'Freight Forwarding & Port Logistics',
    category: 'FORWARDING & MULTIMODAL',
    topics: [
      'Air & Sea freight documentation (Air Waybill, HAWB, Ocean B/L, Multimodal)',
      'FCL/LCL Containerization, stuffing, fumigation, and hazardous cargo protocols',
      'Port gate operations, ICD clearance workflows, and demurrage avoidance'
    ],
    keySkill: 'Coordinating smooth movement of cargo across global borders with zero demurrage losses.'
  }
];
