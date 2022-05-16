import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from 'src/app/pages/aboutus/aboutus.component';
import { CustomerProfileComponent } from 'src/app/pages/customer-profile/customer-profile.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ElectronicServicesComponent } from '../../pages/electronic-services/electronic-services.component';
import { FaqMainComponent } from '../../pages/faq-main/faq-main.component';
import { InvestmentOppsMainComponent } from '../../pages/investment-opps-main/investment-opps-main.component';
import { ServicePageComponent } from 'src/app/pages/service-page/service-page.component';
import { NewsDetailsComponent } from 'src/app/pages/news-details/news-details.component';
import { NewsComponent } from 'src/app/pages/news/news.component';
import { LayoutComponent } from './layout.component';
import { InvestmentOppDetailsComponent } from 'src/app/pages/investment-opp-details/investment-opp-details.component';
import { NewsMainComponent } from 'src/app/pages/news-main/news-main.component';
import { PropertyRequestComponent } from 'src/app//pages/property-request/property-request.component';
import { AuthGuardService } from 'src/app/services/authentication/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutusComponent },
      { path: 'investment-opportunities', component: InvestmentOppsMainComponent },
      { path: 'faq', component: FaqMainComponent },
      { path: 'customer-profile', component: CustomerProfileComponent },
      { path: 'electronic-services', component: ElectronicServicesComponent },
      { path: 'news-main', component: NewsMainComponent },
      { path: 'news-details', component: NewsDetailsComponent },
      { path: 'investment-opp-details', component: InvestmentOppDetailsComponent },
      { path: 'news', component: NewsComponent },
      { path: 'service/:id', component: ServicePageComponent },
      { path: 'property-request', component: PropertyRequestComponent,canActivate:[AuthGuardService]},
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
