import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AboutusComponent } from 'src/app/pages/aboutus/aboutus.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from "primeng/toast";
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsComponent } from 'src/app/pages/home/home-components/statistics/statistics.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgOtpInputModule } from 'ng-otp-input';
import { DropdownModule } from 'primeng/dropdown';
import { IndexOfPipe } from 'src/app/services/pipes/index-of-pipe';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CustomerProfileComponent } from 'src/app/pages/customer-profile/customer-profile.component';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { FaqComponent } from 'src/app/pages/home/home-components/faq/faq.component';
import { NewsletterSubscriptionComponent } from 'src/app/pages/home/home-components/newsletter-subscription/newsletter-subscription.component';
import { BlogPreviewComponent } from 'src/app/pages/home/home-components/blog-preview/blog-preview.component';
import { InvestmentOpportunitiesComponent } from 'src/app/pages/home/home-components/investment-opportunities/investment-opportunities.component';
import { IntroSectionComponent } from 'src/app/pages/home/home-components/intro-section/intro-section.component';
import { ServicesComponent } from 'src/app/pages/home/home-components/services/services.component';
import { ElectronicServicesComponent } from '../../pages/electronic-services/electronic-services.component';
import { FaqMainComponent } from '../../pages/faq-main/faq-main.component';
import { InvestmentOppsMainComponent } from '../../pages/investment-opps-main/investment-opps-main.component';
import { ServicePageComponent } from 'src/app/pages/service-page/service-page.component';
import { PanelModule } from 'primeng/panel';
import { NewsDetailsComponent } from 'src/app/pages/news-details/news-details.component';
import { NewsComponent } from 'src/app/pages/news/news.component';
import { InvestmentOppDetailsComponent } from 'src/app/pages/investment-opp-details/investment-opp-details.component';
import { PropertyRequestComponent } from 'src/app//pages/property-request/property-request.component';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';
import { MaxHeightSetDirective } from 'src/app/directives/max-height-set.directive';
import { CarouselModule  as carousel}  from 'ngx-owl-carousel-o';

@NgModule({
  providers: [ConfirmationService,MessageService],
  declarations: [LayoutComponent,
    HomeComponent,
    AboutusComponent,
    FooterComponent,
    NavbarComponent,
    StatisticsComponent,
    CustomerProfileComponent,
    IndexOfPipe,
    ServicesComponent,
    IntroSectionComponent,
    InvestmentOpportunitiesComponent,
    BlogPreviewComponent,
    NewsletterSubscriptionComponent,
    FaqComponent,
    ElectronicServicesComponent,
    FaqMainComponent,
    InvestmentOppsMainComponent,
    ServicePageComponent,
    NewsDetailsComponent,
    NewsComponent,
    InvestmentOppDetailsComponent,
    PropertyRequestComponent,

    FluidHeightDirective,
    MaxHeightSetDirective
  ],
  imports: [
    // Owl Carousal
    RouterModule,
    carousel,
    FormsModule,
    PanelModule,
    CommonModule,
    ButtonModule,
    SharedModule,
    DialogModule,
    ButtonModule,
    AvatarModule,
    DividerModule,
    TabViewModule,
    CarouselModule,
    PasswordModule,
    CalendarModule,
    DropdownModule,
    NgOtpInputModule,
    ConfirmPopupModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    ProgressSpinnerModule
  ],exports:[carousel]
})
export class LayoutModule { }
