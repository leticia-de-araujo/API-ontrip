import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedUser,
  mockedUser2,
  mockedUser3,
  mockedUser3Login,
  mockedUserLogin,
  mockedUserWithoutAllFields,
  mockedUserWrongType,
} from "../../mocks/userMocks";

describe("/users", () => {
  let connection: DataSource;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("username");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("dateOfBirth");
    expect(response.body.data).toHaveProperty("isAdm");
    expect(response.body.data).toHaveProperty("isActive");
    expect(response.body.data).toHaveProperty("photo");
    expect(response.body.data).not.toHaveProperty("password");
    expect(response.body.data.username).toEqual("Hitalo");
    expect(response.body.data.email).toEqual("hitalo@mail.com");
    expect(response.body.data.dateOfBirth).toEqual("2000/02/11");
    expect(response.body.data.isAdm).toEqual(false);
    expect(response.body.data.photo).toEqual(
      "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAHpAgIDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAgMAAQQFBgf/xAAmEAACAgICAwEAAwEBAQEAAAAAAQIRAyEEMRJBYRMiMlEUBXFC/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECBAP/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREC/9oADAMBAAIRAxEAPwBzkmDaOc+Zsn/YR6OjcUTyRzf+wr/rIOpcX7LSTObDlW6s14stqwHOIqcU30SWWkInn29gXKC/wFY1fQv9rfYSyWUaIQSHqKS6MsMtDFmpdhF5YJpmOePY/JmtdmeeS/YArHsZGFClkr2Mhlv2AzxoGcbWw1K0DLoDPKAPiNZSAGGO5G7BgtdCcEbZ1eNC0BmlxddCJ8bb0dxYfJCZ8fbCuPHBT6NGPDs2fhTGQxUQwvHipdDFjHQx0higFIWIJY9j1H4Wo0AtY9C8mG0aktFVfoGOXk44pca/R1pY79A/iTVc2PHpjoYq9GxYiLHTJQiOOg4woeoEUCNQtRDUQlGi1GjNUKRdBJFkAVRdFyVIC6YBrsbBCYysdDZcQ6K0WSPRYNLkJyaHSEZNlGecqFvNT7LyRdszzi0waeuRXsKPJ/1mLxZVP6RXQ/6bfYaz37OWvJP2Ng5DFdFZL9hKVmKEmaIWSqepWWhcQ0Q0XolFpEoYugoFoY0C0QLogVEIrwLTspKzVPDTZFiOpzMrVKwG9m3JiqNmSUalQDePG5HWwY24mHhYrd0dzDjqIGDNBxi2c3K35NWdnlqos4uX+7CCxptmiON10DxoeTOljw2gMcYSRJRaRv8AxVdATxaYHNyWJabN88V3oX+IGGVokJ0zRlw0nRnjj/lQGzD/ACQ6UNdF8XFa6NssP8QOXKGyKO+jZLDsBYdgBhVM6nFMUMVM6HGjQVvxrRc436Jj0g3sis35bCWOhtFE1QKNBJEIiCywV2ENXERZSLRDEolFkSCq8SUEQGBogRRFUQslEFELK6AHI6iZJ5KZoydGHK6ZRox5LfZsxyX+nHWXxY2PLoYzrtKWuy/I5UOb/rGR5ifsuGt7dgSjYmPJTXaDWeL9oGqljsXLj2PU0/ZakmEZf+b4C+NZtVMLxT/wYuuf/wAvwi41M6FE8SYMccFDY4qQ/wAaLSC6UoUWoUNohMUpKgqLolEqgZTLfZTI1AkIQDyuTHspQodkWxfo6HORmVJmLxuRtzf1Ma/sB0uBE7EI1E5XAR2Ir+IRz+bqLOFm/ud7nLTODlX82Bs4fR1cekcrh6OnB1EBjdIVORU5+hMp/QLk7ZSVi72HF2AOWCaM0ca8+jVk6EwVyA6PEhSNbja6EcVfxNijaAzSxWyRwW+jUsdjIY9gZo8f4Px4vEeoUEkRYqKpFl0V0StRTBYQLM1QewkCWtEXBIhSLIqFooiYXBrYSQCDQMWUWUDEKouygiiUWQCimi6KKAmrTMmWF3o21aFzjaYSuTkjTZnk2vZ08uO7MWbFp0ipWOWdxfYK5cl7KzY3bMc00Erox5zS7HY//QrtnClNr2Cssl7LEr00P/Q+jof+gmuzyq5DXsOPKa9mk162HPT9j481Ndo8fHmte2Nh/wCg17Jhr2EeVF+0HHPF+0eSj/6Nf/odH/069kXXqlli/aDU4v2jzEP/AE/poh/6f0GvQKSfsq76OPD/ANJP2Ohz1J1ZF10r+kvRmhnUuhynaMtyowSnKgHMlbg7IL8iEV53J2L9Bz2LfR0OUrNuLMiX8jXk2mZf/wBAdXgejsRX8Tj8DtHZj/QDn87aZwcqqZ6Llx8os4PJx1N6AbxdI3qX8Tn8dUjWpUuwJOWxcpbLcrA7AtO2Nh0JXY+C0BU1aAxx/kNktFY43IDo8WP8TbGJm40f4m2CAiiMiiKIaiFUWgktFUSqoAOgaMqH2Aw2gGZaCSyMr2SrF2SyIhFQJAkQDEEhaYSYUVksCyWAdksDyInYQdkKLQRCiymUTtgyWiyixKRNWZ8kLTNklYucdFSuVmw9nPz4qvR3cmO0zByMN3oI4WRUIkdDkYab0YskKZuM0lsHyoKSpgNGo86nmRZPoD0D7GGnfq10yLO0JJ0MXWhcmS9sZHlyXsxkRFdGHMkvZpwc2Xl2ceLodjlUuzLUr1fE5XkuzqQzXE8vwstezqx5FR7MV6R05ZvoqWavZz5ch/6BLO37MvSOh/0EOZ+sv9IRSpSsB9AKd+y/K0dDkDPaM1fyNMnaM8v7BXU4Ho7EP6nG4Ho7MP6hCM8bTORyca8mzs5lpnJ5WmBmgvEPy12J8qZPIKZdksWmS9gNj2acStGSDtmrG6QDJLRMSuRJO0FhVyA6XG6NsFoycZaN0FoKtINIiREiEQjQRRKsLZTDaAozWoFi2MkLZmtBYITAIqyWDZLCishSIgCTLTBRYBWVZRaAtBIBBIAkXYJAgrKKshUQolg2UX2U1ZL2RMqFzha6M2XFaZt7AlFNBK4nJwaZzc2DZ6LNitM5+bB3o1Ga4U8VCZQo6+XDV6MeTHVm2KwSjsW4mqcK9CpKixmkkCfZQTQlpFlpEVEOxq2BFWzZxsPkzNbjTxE0jfFSa9hcXi6ujoQ41LoxXrywLG36DWBtnQjx69DY4UvRh6Rzf+dkOn+aIRXkYztdhqZmhLQxM6XIf5a7FN3IryKW5EHV4Ho7WN/xOLwFo7OP+pQHIdRZxOXKmzs8n+pweY9sDK8m+yKViG9hRkA+LCT2Kixi7IpsOx0JUIiNjtgaE7NPHjbMuNWzfxobA6PHjSNcVSEYVSNKQWIkESqIRUKLsEysRgNBNgORmrAyAkE2Lk9ErQZASZcmLkyKuyJ7F2WnsKai0DEJEFkIQCE6KKbooNMJMQpBKQDrJYpMLyCGWUDZVlRbAbLsCTKJ5UV50BJ0LcthD/0X+k87RmcilOijRLaM+WF2WslsKTtFZYMuPRhzY/h1ckbTMWaHZplyMsaszTRvzwpmOcaZqMWENWV4h0Q0yFItR2WkElbJQWONs63Bw7TowYIWzt8KFJaMV6culxsdI1pUhWFUh1nna9on/wAKICYr0kFZASGWnhoy0EpCoO0GdbhH5Bw2xSQ2AHW4B2sa/icTgHax/wBQpXJ/qzz/ADT0HK/qzgcx/wAmBzn2HEBrYcQGR2MihcBsURRxQ6EbYEI2asULYDcELZ0uPCjNgx/Do4IUgRoxxpDUDBUgw0v0UUQggLdBASMqGUhcpUXIXLozWkcgHKymCSrEkxcmWwGRpVlx7KfZI9gPj0MXQuD0MXRBdAvSLFzdICSnQqUwZy2AnbKGKVhRYEY2x0YaAiZdsvxK6CCTJZRCov0CyyqsoXIVLQ+S0KkghQDYbiA0AKnTDWSxE1SAWSmXStbdoz5Y3ZI5dbZJTtFZYs2O7MOXFTZ1cisyZod6NSsuVKNNgmrJj22ZpqmalYxaQUVsCI2HYI1ceNs7nChSORxV/JHc4ipGa3I3QVIIGOkXZ5WvflCrKKsxXpFkKshlXhIdDEKg9Dl0djgRDoCkhkNMDrcDs7ON/wATh8Ds7eP+oAcr+jPPcztnf5X9Dz/M/swrDJ7LiwJdkUqZFaYGjHG2ZsTtm3BGwG48dm3Di30BhgbcMKAbhhS6NmNUhMFSHwCmx6CsGIRFSyWQiFEYDCBZlSpCpDpCZGa0UwQpAEqoCy7BZGgskeyn2SPYGiHQ30Kg9B+iCNip7DewUrZQlwthQxb6NEcd9jIwoBccdehijSDSolABRUoB1sjCE1RQ1i3oqKKZCFKp9CpBsXJhANAtB3ZTARkjoyzVM2zRnyIDP50RZAMipivKgVocrFT2gVLXZG7NRmkzVpmTLGmzdJWjLlj2aZrL0HB7AkqYWNfyCY6nDjbR3eMqicXgo7WDUTNrcjSnogKZdmK9uVlEslnm1EISyEaeExu0OQjGPXR2OASGQVsBIKHYHU4KpnaxbicbgnZw/wBAFcr+p57m/wBmeh5f9Wed5vbCudJ7YKeyS2yl2BqwPZ0+Oc3jrZ1uNHRFbsPRrhpGfCqQ5OgNMGaIbRjhLZqx9BT4lgxCIqyFEXYEBfQQL6MqXITIdIRkZmtFS7FthTYmUqIorKbFOe+wfMVYbdlxEqd+w4yIrTB0gvLRnWSvZP0+gO8thwezN+n0uOWgN0WFZjWei1yPoGvyIZY5032NU012A0gKlfsuwin0BJBNgSZQLdANlSlTAcyoKUhcnsFzsrysItF9gWWpaAGelZlyy7NOR6ZgzTpsKXN2JkypTt9g+VoIryphKVi5dkjIqU7vQucbTLTsvtGoyxzhTJjj/IdONsqC/kKrocJUdjC/4nJ4io62JfxJWoaQFaCs869ItFgouzFbgqICQivDY40OXRSjQSR2OAUdhxWwYobBbA6PB0zs4f6nH4emdjD/AFATyv6s89zltnoeVuJ5/mRuTCuZJWwoQtjVjtj8WLYMXx8ezq4I0jLghRtgqRFaIOkMUhCdBxl6CtEJbNeJmCD2bMO0QbIuwrFw6DqyKuyE/wDoMnS7AuToXKWgZTr2Jnk12SqKUuxOSVgyy7Fyna7M1pU5GebDnITN6IoJTp9gPJ9F5JU3szyy7IrYsu+w1l12YI5N9jY5LQVq/X6T9fpm8/oPn9A0vL9B/ejNKYqctdgbP+mvZS5O+zmzyVYH717A7MOVvs0Q5VLs88uRT7GR5dewj0ceVfsNcpN9nnI86tWMhzbfZR6JZ012DLMv9ONHmWuwv+u12DXRllt9ipZPphfJ+lfvfsqN36fSeZjjmv2Gp37CNPmWpGVzr2Ep/QHzlaMHJ0zWpWjJyemBilKmV5WBkdNgpgHJlJ7BbBumVKfGQxO0Z4yGxeiouSskVTJ2SOpFG/jaOnhlcTlceVHQwy12Zrcar2SwFK0RMxXpBphIBMtMxWhkBshB5T8mieDR2nwfgt8D4djhclRodBUza+E16AlxnEAuPPxZ1MOZJHGpwfQ2GdxVWB0s01JPZzORj8m2M/fy1ZTdoLGNYaY2GOvQ1R2GokaTGqNEdIVFUMWgD9FJ0yWVZA+EtmzDI50JbNeGRNV0YS0MTM8JaClOk9jVMnOl2Z8mdJPYjkcjxT3s5mbl1eyDbk5VN7ES5afs5WXlW3szy5LvslV2nyUyv+hM4v8A0uuyLlfSLHYlmT9i5ZLRz48mw/1tdkUWadGOWXYead2ZZPYqtEJ2+zVCVo52OWzZjeiKa5UL/SvZU9IzTnQD5ZfouWXRnll+gSya7CCyZPomWSvYM52xfYB/o7J+jBUL2VVFQayuxkMr/wBM9UXF0yprfDJ9Gfo/9MWOX0fGWgHKbCU99iU7Ihg2Qnfs0Qna7OfB0zRCQxNaXLRSnT7FeeivLZTWyE7XYvPtMHHILJuLBrm5tNiUx3IW2IXYNHegH2Euin2Cii9jovRmWmOgyhyJ0wVssqHYp0zdhyX7OWn4sbiz0+yNSu1CVrsanZzcOe/ZrhktdnnY9JWi6JYHla7IpUYUwgPkv9IF1sSg/wDC1ji/8OZDmX7NWHleTOtxNX/PFrSQqfDTTpD8WW12aI7QHC5HCq2kc7JgcWz1eTEpJ6OdyeKndBXBiqexy6G5MHjJgKNBYiGR2AlsZBGVEkToL0UQU3QNlS0hcpUFh0ZUzVgls58ZbNWCVsiurCX8QMs6T2VCX8TPnyUnsKx8vNV7OPyM9urNfMnbezlzfk2AMpOT7Iotv2XGFs0QhSJVIcXQqVxN/wCdoRlxaM1SIzp9j45NGbxplrWgHTlYvtkREr6FUUDZi2jPhxWzbiw16IF5FpmDN2zr5MVo5vIxeLYGKTpgSlYWSNNi6CL7Dxxt9AxjbNmCCq2Uoo4P43QE8NXo2XUaFS2yoxSx16FyhRtcbYnLGkBmUqY6E9VZnlpkhOmBujK0EjPCeux0ZWVDVoZGVCUEgHqRaYlMNMDRjYybtCIMZJ6AxcjtmZdmnkdszewGLookS2AIyLpgEWmUaYu0XYuDDT0VElpGeU/F6Y+e0Zci7IH4eS09s3YOX/rOF5eLDhyPH2StvSx5Sa7C/wCn6cCPL+jY8jy9mK07H/V9Icr9GQi6bHLJPtmzj5nfbJD/AM930asPBafR0uRu4mTyrZ1ce4nO42BxOljVIEFWjPljaZp9ASjYVyc+G22jDPHT6O5kx3dox5cK2Skczx30HFUPnioW4URpXoH0F0CyKCekZpypjsjpMyZHbZFFGezZx52+zmqW+zZxpb7CurGX8exGeWmFGWhHIlp0Qczlu29mJK2a+TtszRWwGQiNUaBgtDCVUWgZq0ECyKzyhbFvHs0spRsDOsdvo0YcF+huLD5M6GDjUiBGHj16NcMGjRDBS6HRxUXBjlg0c/l8f2jvfna6MnJwWgPLZsVN6M3js7HLwU20c3JGmAuMaZqx6RnWmNjKkVNOlIGxbmC5gOuhGaWgZZNdiMk7ACbtgR7I3bIiodB0zRB2jNBWzVjiA2KsYlokIjVC1oBaQcUWsdFqNAFHQUnSJFaJPoDFmdtiPZozIz9MA4hAQGAUUEUUFB0OW0IiNj0EE9oRkjpj/QE1phXOyqmzM3TNedbZkktikHGW+zXg2zHBWzfxoWzLbV4kGeJDKvax40V6GRwxQ6iUdDlDGCXQa0ikWFQlWSyWRQSjaM2XHpmy9CcnTCubkhTYiUaNuVbZmmiUZpKmBLoZNC5dGWoz5emY8j2zVlejFke2RQp7NnGlsxRVs28dbA6EHcQMytDMcdBTh5LoDkZ4XZmUaZ1cuG7MssNPoKTFUW5UFKFehctEopyB8gWwewDuxmONsCEHJmzBgt2FP42K1Z08OLXQnjYaRvxw0BUceg1jGqNIuqGIV4UjPnhaeja1oRlhaYNcHl4rvRx+RCmz0vJw3eji8zA02wOS9Ml0g8kabEsC3Ipy+gMhRJSFS2HVleNgBVsOMbCjC30Px4wmKx4zXjxgwhTNWOFAXDHrocoEhEdFAL8L9EeI0qNlrHfoDKsegckKRuWPQrLC10Bycy7Mj7OhyIVZimqYEgNQqOmNiBCmgimiilpjIvQuqYUWA1Ay2iLoKrQGLPG30ZfC2dDLG7ELHsUgMWLZuwY6fQGKBsxRoy0PxIMIZV7IsFMlnQ5xItAJl+VewDIL80vZP0VdkUTdCMj0HKf0TOViqTkM8xs2JmyVSJ+xE9JjpiJsyrNmemY57Zryu7M/jbIqYoWzocfHXozYY0zoYEFaMcNdDPC0XDoKqQGfJjszzw/Dc1YDhYHLyYdMyzxOzszxWKlxrfRKOP8Ai2xmPjNs6a4nw0YeJT2Bz8PEt9HQwcaka8fGSNEcaSARiw0aYxpFpUWBEQhAJVoCUbQZKKMWXHaOfyuP5J6OzKFiMmG0yDyXK4tNtGGWFpnq+RxfJPRz58Hb0Bwfxf8AhX4v/Duf8Pwr/ir0UcL8WX+TOy+HXoB8WvQHMhir0Phjo0/hXouOOmAEMezRCFEjGhsVQFwQ6K0BFDI6CGRiHGIMQ0BK0BkVpjewZK0By+Rj7OfljVnY5ENM5ueNNgZEqYcQa2FHsA0RotF+igGiIj7KQDI9BraFxDQAyVoBR2Nq0D7IQeNUaYGaGh8GStHkBsgV65MtMEGcvFXZ7PBMmVRTsyz5aTdMx87lePs5c+ZcuwR3HzLfZceVfs4kOQ5ex2ObbuyK7KzeRHKzFik/ZpTtEVJy0Jkxk+hE2SqXOXYibGTexE5USqTkE3TDyS7ESnTJVaYTo14MtPs5H617G4s9Psg9BiyWuxydo5XHzWjoYZ+SAelZfiFCNoYoAKWOy1iseo0EkEJWEOOOhpXQESpF9A+VAuQUy6BbFOYDmBo8i7Mv6b7LWTVWBpUrLM8ZhqX0ob2C42RStdlrYC54k/QmXHv0a6KpAYHxkLlgo6TgmBKFrog5U8GuhMsXw6s8NmeeKr0BzJ4uxLx16OlPEZ546AyKNMJIY4UykqGiJBpFJBpUASDTARfQ0NQXaFRexidoujPnjpnL5EezsZVaOdyIaYRypaZIh5Y02DHsBiL9AoL0AMgegmAUFENCkGmAdlXsllMKKLpjoMzJ0xkZENaPIgryIDXtboy8rL4xGzmkuzkc/PSas9Xk53P5HlJoxJ27srPPym9l4Fb2CNeCNo34oaM/Hx60dDFj0SqLGqRoj0DGFIOqRKsBITMbPoRN0ZahOQy5X2PyMzZH2RWbI9sROQzK9szTfZAMp7LhkpiZMqMv5Adjizto7PF2jgcN20ei4MbSA6GOOhqVAw0gwIToq6QLf0AropyAcgJT+hDGxcpAOf0CU/oUcpfQJS+i5T+i5ZK9gNcqKU/pllmr2Leen2UdBZK9lrLRzP8Ap+kXJ+gdWObY+GW12cWPJtmrDm8kB1FOy/KzHHJ9GRyaINF2QSsn0JZL9gMatCZwu9Bed+ynK0BmnGvRnnC70asm2JkQY5Q2xUo0a5oRNUyBaVBIEsugkWCiXoaLTphxnrszzlQH617KNUp2jNyNplPNrsVkyWnsqVhz6bELsdmdszp7AamX6Fp7DT0BGA2XIXJ7KDTCTFJhpgMTKKTLBqewoi7DiIhl/SA2Q0O9k58VF/yOVy+V5N0zmy5cmqti/Nye2Vg7y8pWzZxoW9GHFFtnV4eN2CN/Hx0jfjjoVx8etmuMaQqxFEkloNKipdGa1GeZmyGnI6MuR9mVjLkfZlyPs05HZkyPbIpGT2ZsjH5GZsnsBMuyQVsjWxuDH5SIrpcCFtHpOHGoo5H/AJ2GqdHdww8YhD46RflQCZTYBSloW5WSwSiMXOVDBGZ0gBlkr2Jll+mbPl8W9mV8nfYHQll12ZsmavZklybXYjJyLT2UacmerM0+Tsy5M9+zNLNb7A6D5N+woZm2cyM7fZu46sDfik3s38d0jHgh/E241SA0KVBqeuxKLuiBqmGp/TMpUEpfQHrIWsl+zP5FqVAOcrFyYPmA5/TIknoRkGSkZ8kgqr2S9inLZXkA5MqUhakVKQA5ZUjNLJTCyzpdmSc/ppDv1+i55bM08lexTy/SxK0TnbAQpZLYxO0UEg09C12GgJLoTJ7GS6ESewCT2MiJT2HFgOTogCYVgEuw0haHR2VlKIHRDaa5scLb6Zpxcdv0dOHC10aMPEp9ERiwcS2dbi8fxXQ3Dx69G3Hj8UAOOFLoetIpKi/RFiPoVIOTFyejLZGT2Zcj7NOR9mPL7MrCJ+zLk7NE3tmfJtkVln7M8zTNdiJoBKVs6HCxeTRiiv5HV4EdoDtcLF4paOgtKjLx9RHeVoIOwW7K8iWBZCiIourE54/xtD0gZ7TT9gef5rcWzkZMzTezvf8AoYO3R57lQcZPQAvM/wDRUs1+xUpULbsoZLJfsBStgdhQWwNOBWzq8bHpGHiwtnX48aQGvDCkPWhMXS0X5AO8ivIS50D5kD3MnmZ/Ky0wHqRfmIT+lpkDXIVKZGwGRROehM5Ft0Km7ApvYPkC3sGwHJgTloByoXky0ihWafZjnPvYzNkuzHPJtliLnO/Yry2BKV2Dey4laIO2aYbRjxy3Rqxu0UNRaKRYRUuhE9MdLoRMqqQyLoStMZEIamEgEGgDj2PghEezRjNRm0yiF0Q1jLtQiPxw2Lxq2accDKmQgNSpEjGkFQUNAvQTAkZWBkLk+wpCpMy1C8nTMeX2asj7MmTbZlpnmxE9jpexciKzTQmaNM0ImqCEpVI6fBlTRza2beLPxYHoMM/4jlK0YMGXXZpjO/YGhMtMUpF+dFDLJYvzK8/pRojLZJNMzrJXsv8AW/YQvlY/KLPO8/BTej0k5qUWrORzoJptAeayxpsTWzfycdN6MbjsAEh2KFsGMLZrwQplGrjY6XR0sSpGPDSRpjkSQGjypE8tCHmr2Llm+kD5T+i/PYiWX6B+m+wNilYaZjjk+jozsB6YViosK9EB2BJksCTIqSkJlIuUhMnsC2wHIpsXKVMqUUp17M+SemSc6XZmyT72UBkndmab2HOVtiZdmkQhX/0iKhmPbNmPox41s2YxiaciIpFoYI+jPM0S2jPk7Cl+xkBYcdBDkEnsXEJPYDobZpxmWD2acbNxmnEKshpl3sEbZ0McKQnBjpGqKpGGkqiVoMqtEUqQuQya0JlozVgJMVJhyYqctGW4VklpmXI+x2SXZmnK2ZahcuxbDYL6ClSET9j5exEgEy0xmKfi+xU9AeVMI6/Hz+rOhiyWuzz2HNT7Olx81osSuspk8jLDLfsPztdgO8gJZKFuQrJPTKDlmpg/9G+zLknVmeWTfYR0f+jQjPk8k9mT9G/ZNyAzchWzDNUzpzx2jJkwu2Bnho0QnSFrE0/YSxtegHxzV7CWd/6JWNhLEwGPM/8AQP1ZPyZTxtAT9fpSyb7BcaBaoDRDLXs0Y8l+zAtMdjlsDownY1S0Y8ctDoy0A7yAkyvKymyAJC5BzFSYNDLSM+SVNjpukZMr7KUGSfezNOVth5JdiJM0yqTAfZbYHZpKstAoJFxnTca2a4aRlxGqHQxTEEgEXZFE+jPkH3oRkIF+y4gloB0WWnsXFhrsodBj4SozR0NizUYrT5EEeRDbL3UY0hsQUgkeb0X6KL9E9EUqfRnnpmiZmydszVhUpUZ8kvoeSVWZskuzFbLyS7ESYU5W2KkyNI2VeirKvQASEyGyFyAzzEydMfMRMIGMqZrwZq7Zh9hQlXssR2cfI12aI5r9nEjlr2Px8insDrrJaAnK0ZYZ7XYz9LRUDkYiW2NlKxUmAUI2zRCFroRj7NUHoCnitCpYU30aCUE1k/BE/CkaaKBrOsIX5Didg0n89ASx/B7BYVklj+CpQo1zQmSAz+Gw4Rph+JajQTRw0NjISgk/oNPUiSlSE+deypT0MNXOQtyFzyU+xbylw0zJLRjyzDnktdmTJLbLIgZyti2Ru2DZtlTKLKKmrQaAQcRgdjWzTAzYzRF0gaYSwEy7Jhor0Jmw70Lmxi6WyIpkToYaYhkexSYyGwHRGxjYEFY+BqRm1PEg6iG2Xti+ikiHk9FkZRRlQT9mTK6s1z6MWb2StRmyPszTlYzI9sRLZitFyFyDkBIjQCXogIFSAl0G0BIBM12Zpo1SQicQlZn2RBSjsGgi7CjOmAUUaYZa9j456XZgUqIp/So6DzX7Almv2Y/MjmB0MWXZsxTtHGhkp9m3Bm0B01K0R7M0ctrsNTCGEF+f0jmUGSxXkTyIDbAZTl9AcgauXQp9lykA5WwanRLBspsqCsHzr2LlKhcp17GB0sv0W8v0RKf0VKd+yh08lvsV+gqUtg+RpDJTv2Jm7KcgW7NRKohGQuMIQhBhqIKPYJcexhrRjHITj6GohokSygbCrk9di5MkmA2MNWUiiIYujXY6BnQ6DBrXA04zJBmjGzcZp9EKshUe2RCWSzxeiWQohFLydGLM7s2ZHoy5FZKrDNbYqUTXKFiZQoxW2WSoVI0ZI0Z5oillF0UFUwXsKiqCFSQqcTQ0LmgMk4geI+SFyiVklrZKDa2RIoDx0VQ1RsiiAuieI5QLULARGJpwqg44b9D8eGkVEi6QalQX50gXCgIpBeQuqKANyBcwb0CxgLz+lOegAZDEE5fQfIBsGwG+QEpg2UwmqlIVKQUhUigJSAbLkLZpEb0DYT6ANREIV7KKyssohUWQosCBR7BDiQOhoYhcQ0BYMiwJBQyBLYJVWRAloAkOgJXY2HYGiBpxmbGaIFiH2QqyFR7iyFFHi9F2UQoignsTJWx0tgUSqS4ipw09Gmhc1pmWo5+WNGPIqZ0MyMWRbZmtEUUHWyJABRfjYaiX4hCXEXOOjS4ipxKjLNCZI1TQmUShDWyJBtA1sCJBURInsC0hsI2wIq2aMcbZUNx47RohjKxR0aIRAX+YEsXw2eOgZQ+AYJYq9C5Qpm+WPXQmcAjG4gOJplACUAM9C5RNDiC4AZnEGtmhwA8QF1oGQ1xFyWioVIVIdITIsSlPsBoZJANGoyBgsKQLNIH2WT2QqVCELKKLJREiCJBxKSLS2A2PQSAjoMYagEggJDDQsouiJWXBRaVhKFhxxjAKWxsEXHGNhChho8aHR0BCNDoopUIXRCpr3BCiHO9kK7LZQFUBQfQJK0qhU1oaLl0SjHljdmScLZvyRtiHC2ZaZPzLWM1eBPzpAZ1jKcKHyjQEkEIlGhM0aJIXKNlGScRcomyULFSx/AMcog1Xo1Sx/BTgAgtdjfAihbCJBbNOFAY8dmvHjoBmOOh8UDCNIdBFFqJKDUQqAzyiJnE2SiJmgjHKADh8NMlsW0BncAXD4aGgGgM0oC3GjTKIqSCEyQqSHNC5IozzQiRpmZ5mkJkCwpAM0yGQITB7NRlRaRdBJFA0TxDSLSGIFIij8DUQ1EoBRLUQ1ElA1SVF0XRajYw0ANWxvjZahYw0pRsuMLHRxjY4xhpMcQ2OP4NjANQopoFANQGRhYah8BpcYfBscYccY2EAhX5kNXiQqPTEsoo5nQKwboqUqFSmAcpgOexbnb7ItkDPIlWSMbGRgKrPKF+gPz2bXAVKFEVl8KKlGl0aHEXNaZMVln2LasdKOylEBPhZX5j1EniBmePQEsRroHwtdAYpYhUsWzoShYuWIIwfl8JHFs2fkSOPYC8eI0wx0XCFGiEAgYwGxgXGIyMSgVEutBlPoKTITIfNCZdhCZRFtD5IXJAJaBaGtANAIkhM0aZITNdhGaSFyHTQqSKjPP2Z5mqcezNNbNxKTIFoNrYNFZoK2RIPxIkaShUQlEJRCUS4lAohKIaiWkXAKRaiGkRIqBSJQdFpAAkEohKIxQGJpaiHGHwYoDIwGGlRh8DUaGqNei6KaCMQ1AuI2KBqowoJRCSLSBq4oZFAxQaKiyFkA9D0BKVElKhE5fTldK55Potytgt2y4xtgFFWx0IlQgaIxpEEjGkFVItaRQE9ASCvQEn9IpckImxspfTPN77DQJdkKbBsAiA2TsCyiE6AlAuNhIiVkQHhYSxjFENRAXGFehsY6LUQ0gIkWkRIIooF9BFMBckKkh0kLfYCZIW0PaAoBTiBKI6gJIIRKIqcTTJCZRKjJOIqUTVKNipKixKyzjpmXIqbNuRUjHk9moyQ1sGg32UkajKkiKIaQSjZpKBRDSCUS1EqAolB0SioFIJIiRfRRaRaiRMiZUHGIyMRcZDFJV2DRKNBpAfol7KWT6A0tIV+pP1r2A5Bp0Zf2r2T90BsUvpakYf3+k/6AOgpfQlP6c7/AKPpa5H0Do+ZDB/0fSAernIS3bGNWUoWzldKoRtjoQ+EhCvQ6KoC4xoNaQKdIpukAUpULeSvYvJOvYiWT6QPlkEzy/RTnfsXKZFhkst+xUp2DdgsKvyK8gWCFNUgk7FLYyAQxKymg4q0XQCy0XREgDiMSFxGIC0gkikWgCRCkWBRTCYDACXQD7GSFsAWiqLZAgGgJIbWgJFKU0BKIyQDCM80ZsurNeRaZjzukzSMeWRlm7bHZXbE+Ns0xQdhJDFAtRNJQRjYxRovoFyNM1ZLAcwfIA3Iry0L8rKsqD8yvMAo0hnkTyf+iyAN/SvZP1f+iSgh/wCrJ+ojZNgP/Ur9H/oqmRIBn6fSv0f+g+LIosAvNk82TxJ4AT9Alk+g/mTwAP8AQgHiyAfQaLSKsnkcrpMWgkxSkTzAbehU50uynITOYFZJ30IbsKTsDtkVfoFoL0V2Fga2SgkglHRFIkqArY+a0JfYFxGQAihkVTAdDoOgYDEtABRXjsb42TxAWlQaQSiSgIiyEAiCBQSAoFh0C0ADAaDaBaAX7IE0CwigJBip9FSglIBsDJKhP6b7NJTcnRz877NMp2uzJmd2Vmsk1bBUaCl2BKdGmaO6Bc6EuZXlZuJo5TAcrZVNlrG2VETstKxkcTfofDBfaCMyhey1jN0cGi/xLBh/Mn5m/wDEn4osRz/yK/L4dH8SvyKVz/xLWE3/AJfCfl8CMKw/C1hNv5fCfn8IMSwlrCbFjr0EoAY1hLWE1qBbgBl/L4T8jT4lqAGX8ifl8NSgX+fwox/kQ2fmQmD09lWUyjldK7J5AlAXKdITOWwpdCX2BHKy1sBdhRIo0glEFdhoCVTKbpFyFz7ZFDNi+2SXYK7CmRGRWxUeh0CodBDktAQGLogiRaREWBRKLKChIWQC0i0ikWgiUDQYLABoBrYxgMAGgA5FeixAMTkdJjpGfL0WDHyJ0Y3k32O5HbMj7NRmmPJa7E5JWE+hMys0uUrFtNsJ9kRpAxxtsZHDYcB8OzbJUePY2HH+DojYhCo4aGxx0HEtAUok8Q0QoDxK8RgLLEB4leIz0UAHj8J4hlAB4k8QyggPEniGQClEniGiAD4lqIRCivFE6IDIAtEFECP/2Q=="
    );
    expect(response.status).toBe(201);
  });

  test("POST /users -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /users -  should not be able to create a user with an email that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /users -  should not be able to create a user without all the information", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserWithoutAllFields);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /users -  Must be able to list users", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data.token}`);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: response.body.data[0].id,
          username: response.body.data[0].name,
          email: response.body.data[0].email,
          dateOfBirth: response.body.data[0].dateOfBirth,
          isAdm: response.body.data[0].isAdm,
          isActive: response.body.data[0].isActive,
          photo: response.body.data[0].photo,
        }),
      ])
    );
  });

  test("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users -  should not be able to list users not being admin", async () => {
    const userResponse = await request(app).post("/users").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /users/:id -  Must be able to list one user being the owner", async () => {
    const userResponse = await request(app).post("/users").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const responseOneUser = await request(app)
      .post(`/users/${userResponse.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.data.token}`);
    expect(responseOneUser.body).toHaveProperty("message");
    expect(responseOneUser.body).toHaveProperty("data");
    expect(responseOneUser.body.data).toEqual(
      expect.objectContaining({
        id: responseOneUser.body.data.id,
        username: responseOneUser.body.data.name,
        email: responseOneUser.body.data.email,
        dateOfBirth: responseOneUser.body.data.dateOfBirth,
        isAdm: responseOneUser.body.data.isAdm,
        isActive: responseOneUser.body.data.isActive,
        photo: responseOneUser.body.data.photo,
      })
    );
  });

  test("GET /users/:id -  Must be able to list one user being the admin", async () => {
    const userResponse = await request(app).post("/users").send(mockedAdmin);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const responseOneUser = await request(app)
      .post(`/users/${userResponse.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.data.token}`);
    expect(responseOneUser.body).toHaveProperty("message");
    expect(responseOneUser.body).toHaveProperty("data");
    expect(responseOneUser.body.data).toEqual(
      expect.objectContaining({
        id: responseOneUser.body.data.id,
        username: responseOneUser.body.data.name,
        email: responseOneUser.body.data.email,
        dateOfBirth: responseOneUser.body.data.dateOfBirth,
        isAdm: responseOneUser.body.data.isAdm,
        isActive: responseOneUser.body.data.isActive,
        photo: responseOneUser.body.data.photo,
      })
    );
  });

  test("GET /users/:id -  should not be able to list one without token", async () => {
    const userResponse = await request(app).post("/users").send(mockedAdmin);
    const responseOneUser = await request(app).post(
      `/users/${userResponse.body.data.id}`
    );
    expect(responseOneUser.body).toHaveProperty("message");
    expect(responseOneUser.status).toBe(401);
  });

  test("GET /users/:id -  should not be able to list one user not being admin or owner", async () => {
    const userResponse = await request(app).post("/users").send(mockedAdmin);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);
    const responseOneUser = await request(app)
      .post(`/users/${userResponse.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.data.token}`);

    expect(responseOneUser.body).toHaveProperty("message");
    expect(responseOneUser.status).toBe(401);
  });

  test("PATCH /users/:id -  should be able to update user being owner", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser2)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.status).toBe(200);
    expect(userUpdate.body.data).toEqual(
      expect.objectContaining({
        id: userUpdate.body.data.id,
        username: userUpdate.body.data.name,
        email: userUpdate.body.data.email,
        dateOfBirth: userUpdate.body.data.dateOfBirth,
        isAdm: userUpdate.body.data.isAdm,
        isActive: userUpdate.body.data.isActive,
        photo: userUpdate.body.data.photo,
      })
    );
  });

  test("PATCH /users/:id -  should be able to update user being admin", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const userLogin = await request(app).post("/login").send(mockedAdminLogin);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser2)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.status).toBe(200);
    expect(userUpdate.body.data).toEqual(
      expect.objectContaining({
        id: userUpdate.body.data.id,
        username: userUpdate.body.data.name,
        email: userUpdate.body.data.email,
        dateOfBirth: userUpdate.body.data.dateOfBirth,
        isAdm: userUpdate.body.data.isAdm,
        isActive: userUpdate.body.data.isActive,
        photo: userUpdate.body.data.photo,
      })
    );
  });

  test("PATCH /users/:id -  should not be able to update user without being owner or admin", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedUser3);
    const userLogin = await request(app).post("/login").send(mockedUser3Login);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser2)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.status).toBe(401);
  });

  test("PATCH /users/:id -  should not be able to update user with existing email", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedUser3);
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.status).toBe(403);
  });

  test("PATCH /users/:id -  should not be able to update inexistent user", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const userLogin = await request(app).post("/login").send(mockedAdminLogin);
    const userUpdate = await request(app)
      .patch(`/users/100`)
      .send(mockedUser3)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.status).toBe(404);
  });

  test("PATCH /users/:id -  should not be able to update user without authentication", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUser3);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.status).toBe(401);
  });

  test("PATCH /users/:id -  should not be able to update with incorrect type", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const userLogin = await request(app).post("/login").send(mockedAdminLogin);
    const userUpdate = await request(app)
      .patch(`/users/${createUser.body.data.id}`)
      .send(mockedUserWrongType)
      .set("Authorization", `Bearer ${userLogin.body.data.token}`);
    expect(userUpdate.body).toHaveProperty("message");
    expect(userUpdate.status).toBe(400);
  });

  test("DELETE /users/:id -  should be able to soft-delete user as owner", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const loginUser = await request(app).post("/login").send(mockedUserLogin);
    const UserTobeDeleted = await request(app)
      .delete(`/users/${createUser.body.data.id}`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserTobeDeleted.body).toHaveProperty("message");
    expect(UserTobeDeleted.status).toBe(200);
    const UserDeleted = await request(app)
      .get(`/users/${createUser.body.data.id}`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserDeleted.body.data.isActive).toBe(false);
  });

  test("DELETE /users/:id -  should be able to soft-delete user as admin", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const loginUser = await request(app).post("/login").send(mockedAdminLogin);
    const UserTobeDeleted = await request(app)
      .delete(`/users/${createUser.body.data.id}`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserTobeDeleted.body).toHaveProperty("message");
    expect(UserTobeDeleted.status).toBe(200);
    const UserDeleted = await request(app)
      .get(`/users/${createUser.body.data.id}`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserDeleted.body.data.isActive).toBe(false);
  });

  test("DELETE /users/:id -  should not be able to delete user without authentication", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const UserTobeDeleted = await request(app).delete(
      `/users/${createUser.body.data.id}`
    );
    expect(UserTobeDeleted.body).toHaveProperty("message");
    expect(UserTobeDeleted.status).toBe(401);
  });

  test("DELETE /users/:id -  should not be able to delete inexistent user", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const loginUser = await request(app).post("/login").send(mockedUserLogin);
    const UserTobeDeleted = await request(app)
      .delete(`/users/300`)
      .set("Authorization", `Bearer ${loginUser.body.data.token}`);
    expect(UserTobeDeleted.body).toHaveProperty("message");
    expect(UserTobeDeleted.status).toBe(404);
  });
});
