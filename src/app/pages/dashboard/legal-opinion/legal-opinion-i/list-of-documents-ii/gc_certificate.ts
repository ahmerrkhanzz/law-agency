import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopPosition,
  TabStopType,
  TextRun,
  UnderlineType,
  VerticalAlign,
  WidthType,
} from 'docx';
const PHONE_NUMBER = '07534563401';
const PROFILE_URL = 'https://www.linkedin.com/in/dolan1';
const EMAIL = 'docx@docx.com';

const borders = {
  top: {
    style: BorderStyle.NONE,
    size: 1,
    color: '#fff',
  },
  bottom: {
    style: BorderStyle.NONE,
    size: 1,
    color: '#fff',
  },
  left: {
    style: BorderStyle.NONE,
    size: 1,
    color: '#fff',
  },
  right: {
    style: BorderStyle.NONE,
    size: 1,
    color: '#fff',
  },
};

export class GCCertificateCreator {
  // tslint:disable-next-line: typedef
  public create([beforeTransactions, intro]): Document {
    const document = new Document({
      styles: {
        paragraphStyles: [
          {
            id: 'Heading1',
            name: 'Heading 1',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            run: {
              size: 26,
              bold: true,
              italics: true,
              color: 'black',
              font: 'Bookman Old Style',
            },
            paragraph: {
              spacing: {
                line: 276,
                before: 20 * 72 * 0.1,
                after: 20 * 72 * 0.05,
              },
            },
          },
          {
            id: 'Heading2',
            name: 'Heading 2',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            run: {
              size: 26,
              bold: true,
              font: 'Bookman Old Style',
              underline: {
                type: UnderlineType.SINGLE,
                color: '#000',
              },
            },
            paragraph: {
              spacing: {
                line: 276,
                before: 20 * 72 * 0.1,
                after: 20 * 72 * 0.05,
              },
            },
          },
          {
            id: 'wellSpaced',
            name: 'Well Spaced',
            basedOn: 'Normal',
            quickFormat: true,
            paragraph: {
              spacing: {
                line: 276,
                before: 20 * 72 * 0.1,
                after: 20 * 72 * 0.05,
              },
            },
          },
          {
            id: 'ListParagraph',
            name: 'List Paragraph',
            basedOn: 'Normal',
            quickFormat: true,
          },
        ],
      },
    });

    document.addSection({
      children: [
        new Paragraph({
          style: 'Heading1',
          children: [
            new TextRun({
              text: 'To,',
              font: {
                name: 'Bookman Old Style',
              },
              style: 'wellSpaced',
              size: 22,
            }),
          ],
        }),

        new Paragraph({
          style: 'wellSpaced',
          children: [
            new TextRun({
              text: 'Section Head Risk Management,',
              font: {
                name: 'Bookman Old Style',
              },
              style: 'wellSpaced',
              size: 22,
            }),
          ],
        }),

        new Paragraph({
          style: 'wellSpaced',
          children: [
            new TextRun({
              text: 'BankIslami Pakistan Limited',
              font: {
                name: 'Bookman Old Style',
              },
              style: 'wellSpaced',
              size: 22,
            }),
          ],
        }),

        new Paragraph({
          style: 'wellSpaced',
          children: [
            new TextRun({
              text: 'Head Office, Karachi. ',
              font: {
                name: 'Bookman Old Style',
              },
              style: 'wellSpaced',
              size: 22,
            }),
          ],
        }),
        new Table({
          rows: intro
            .map(education => {
              const arr = [];
              arr.push(this.createTableRow(education));

              return arr;
            })
            .reduce((prev, curr) => prev.concat(curr), []),
        }),
        ...beforeTransactions
          .map(education => {
            const arr: Paragraph[] = [];
            const bulletPoints = this.splitParagraphIntoBullets(
              education.notes
            );
            bulletPoints.forEach(bulletPoint => {
              arr.push(this.createBullet(bulletPoint));
            });

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
        new Paragraph({
          style: 'wellSpaced',
          children: [
            new TextRun({
              text:
                'This legal opinion is based on the copies of documents provided to us. We can demand further chain documents at the time of original file review, to secure the interest of bank. While scrutiny of documents, due care has been taken. However, errors and omissions may be expected. We trust that the foregoing would be comprehensive, effective & securing the interests of financial institution. In case of any ambiguity/clarification, we may be contacted without any hesitation ',
              font: {
                name: 'Bookman Old Style',
              },
              style: 'wellSpaced',
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          style: 'wellSpaced',
          children: [
            new TextRun({
              text: 'More references upon request',
              font: {
                name: 'Bookman Old Style',
              },
              style: 'wellSpaced',
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          style: 'wellSpaced',
          children: [
            new TextRun({
              text: 'With compliments',
              font: {
                name: 'Bookman Old Style',
              },
              style: 'wellSpaced',
              size: 22,
            }),
          ],
        }),
        this.createSubHeading('FOR GLOBAL LAW COMPANY'),
      ],
    });

    return document;
  }

  public createContactInfo(
    phoneNumber: string,
    profileUrl: string,
    email: string
  ): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
        ),
        new TextRun('Address: 58 Elm Avenue, Kent ME4 6ER, UK').break(),
      ],
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      style: 'wellSpaced',
      children: [
        new TextRun({
          text: text,
          font: {
            name: 'Bookman Old Style',
          },
          style: 'wellSpaced',
          size: 22,
        }),
      ],
    });
  }

  public createTableRow(obj) {
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: obj.name,
                  font: {
                    name: 'Bookman Old Style',
                  },
                  style: 'wellSpaced',
                  size: 22,
                }),
              ],
            }),
          ],
          borders,
          columnSpan: 5,
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              style: 'Heading1',
              children: [
                new TextRun({
                  text: obj.value,
                  font: {
                    name: 'Bookman Old Style',
                  },
                  style: 'wellSpaced',
                  size: 22,
                }),
              ],
            }),
          ],
          borders,
          columnSpan: 3,
          verticalAlign: VerticalAlign.CENTER,
        }),
      ],
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split('\n\n');
  }
}
