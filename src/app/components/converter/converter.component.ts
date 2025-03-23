import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { AppSettingsService } from '../../services/app-settings.service';
import { PriceService } from '../../services/price.service';
import { BigNumber } from 'bignumber.js';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.less']
})
export class ConverterComponent implements OnInit, OnDestroy {
  Mnano = '1';              // Nano amount as string
  raw = '';                 // Raw amount as string
  fiatPrice = '0';          // Fiat amount as string
  invalidMnano = false;     // Validation flag for Nano
  invalidRaw = false;       // Validation flag for raw
  invalidFiat = false;      // Validation flag for fiat
  priceSub = null;          // Subscription to price updates

  // Conversion constant using BigNumber
  private readonly RAW_PER_NANO = new BigNumber('1e16');      // 10^16 raw per Nano

  constructor(
    private util: UtilService,
    public settings: AppSettingsService,
    private price: PriceService,
    public notifications: NotificationService
  ) {}

  ngOnInit(): void {
    // Configure BigNumber to handle 16 decimal places
    BigNumber.config({ DECIMAL_PLACES: 16 });
    this.Mnano = '1';

    // Subscribe to price updates and adjust fiatPrice based on Mnano
    this.priceSub = this.price.lastPrice$.subscribe(event => {
      const mnanoBN = new BigNumber(this.Mnano);
      if (mnanoBN.isFinite() && !mnanoBN.isNaN() && mnanoBN.gte(0)) {
        // Directly use Mnano as Nano amount for fiat calculation
        this.fiatPrice = mnanoBN.times(this.price.price.lastPrice).toString(10);
      } else {
        this.fiatPrice = '';
      }
    });

    // Initialize with Mnano = 1
    this.unitChange('mnano');
  }

  ngOnDestroy() {
    if (this.priceSub) {
      this.priceSub.unsubscribe();
    }
  }

  unitChange(unit: string) {
    switch (unit) {
      case 'mnano':
        const mnanoBN = new BigNumber(this.Mnano);
        if (mnanoBN.isFinite() && !mnanoBN.isNaN() && mnanoBN.gte(0)) {
          // Nano to raw: Mnano * 10^16
          const rawBN = mnanoBN.times(this.RAW_PER_NANO);
          this.raw = rawBN.toString(10);

          // Nano to fiat: Mnano * price.lastPrice
          this.fiatPrice = mnanoBN.times(this.price.price.lastPrice).toString(10);

          this.invalidMnano = false;
          this.invalidRaw = false;
          this.invalidFiat = false;
        } else {
          this.raw = '';
          this.fiatPrice = '';
          this.invalidMnano = true;
        }
        break;

      case 'raw':
        const rawBN = new BigNumber(this.raw);
        if (rawBN.isFinite() && !rawBN.isNaN() && rawBN.gte(0)) {
          // Raw to Nano: raw / 10^16
          const mnanoBN = rawBN.div(this.RAW_PER_NANO);
          this.Mnano = mnanoBN.toString(10);

          // Raw to fiat: (raw / 10^16) * price.lastPrice
          this.fiatPrice = mnanoBN.times(this.price.price.lastPrice).toString(10);

          this.invalidRaw = false;
          this.invalidMnano = false;
          this.invalidFiat = false;
        } else {
          this.Mnano = '';
          this.fiatPrice = '';
          this.invalidRaw = true;
        }
        break;

      case 'fiat':
        const fiatBN = new BigNumber(this.fiatPrice);
        if (fiatBN.isFinite() && !fiatBN.isNaN() && fiatBN.gte(0)) {
          // Fiat to Nano: fiat / price.lastPrice
          const mnanoBN = fiatBN.div(this.price.price.lastPrice);
          this.Mnano = mnanoBN.toString(10);

          // Nano to raw: Mnano * 10^16
          const rawBN = mnanoBN.times(this.RAW_PER_NANO);
          this.raw = rawBN.toString(10);

          this.invalidFiat = false;
          this.invalidMnano = false;
          this.invalidRaw = false;
        } else {
          this.Mnano = '';
          this.raw = '';
          this.invalidFiat = true;
        }
        break;
    }
  }
}