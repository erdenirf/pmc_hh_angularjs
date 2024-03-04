export default class ModelPMC {
  PMID;
  PMCID;
  Title;
  Categories;
  date_epub;
  Abstract;
  Author_initials;
  Author_fullname;
  Affiliations;
  Text_full;
  Glossary;
  journal_nlm;
  journal_longname;
  journal_ISSNP;
  journal_ISSNE;
  DOI;
  book_volume;
  book_issue;
  book_first_page;
  book_last_page;
  date_year;
  date_month;
  date_day;
  Ref_ids;
  References;
  
  constructor(journal, PMID, PMCID, DOI, Title, Author, date, date_epub, Abstract, Text_full, Glossary, Categories, Affiliations, book, Ref_ids, References) {
    this.PMID = PMID;
    this.PMCID = PMCID;
    this.Title = Title;
    this.Categories = Categories;
    this.date_epub = date_epub;
    this.Abstract = Abstract;
    this.Author_initials = this.getAuthorsInitials(Author);
    this.Author_fullname = this.getAuthorsFullName(Author);
    this.Affiliations = this.getAffiliations(Affiliations);
    this.Text_full = Text_full;
    this.Glossary = this.getGlossary(Glossary);
    this.journal_nlm = journal.nlm;
    this.journal_longname = journal.longname;
    this.journal_ISSNP = journal.ISSNP;
    this.journal_ISSNE = journal.ISSNE;
    this.DOI = DOI;
    this.book_volume = book.volume;
    this.book_issue = book.issue;
    this.book_first_page = book.first_page;
    this.book_last_page = book.last_page;
    this.date_year = date.year;
    this.date_month = date.month;
    this.date_day = date.day;
    this.Ref_ids = this.getRefIds(Ref_ids);
    this.References = this.getReferences(References); 
  }
    
  getAuthorsInitials(array) {
    var result = [];
    array.forEach(function (element) {
      result.push(element.initials);
    });
    return result.join(", ");
  }
  
  getAuthorsFullName(array) {
    var result = [];
    array.forEach(function (element) {
      result.push(element.fullname);
    });
    return result.join(", ");
  }
  
  getAffiliations(array) {
    var result = [];
    array.forEach(function (element) {
      result.push(element.institute);
    });
    return result.join("; ");
  }
    
  getGlossary(array) {
    var result = [];
    array.forEach(function (element) {
      result.push(element.definition);
    });
    return result.join("; ");
  }
  
  getRefIds(array) {
    var result = [];
    array.forEach(function (element) {
      result.push(element.pubmed_id.toString());
    });
    return result;
  }
  
  getReferences(array) {
    var result = [];
    array.forEach(function (element) {
      result.push(element.paper);
    });
    return result;
  }
}