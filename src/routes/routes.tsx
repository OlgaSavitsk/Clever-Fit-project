import { Route, Routes } from 'react-router-dom';
import { RoutePath } from '@constants/index';
import {
    AchievementsPage,
    CalendarPage,
    ConfirmConfig,
    ErrorPage,
    MainPage,
    PageConfig,
    ProfilePage,
    ResultErrorRequired,
    ResultModal,
    ReviewsPage,
    SettingsPage,
    SignIn,
    SignUp,
    TrainingsPage,
} from '@pages/index';
import { MainLayout } from '@pages/page-config/main-layout/main-layout-page';
import { UnauthorizedLayout } from '@pages/page-config/unauthorized-layout';


export const routes = (
    <Routes>
        <Route path='/' element={<PageConfig />} >
            <Route element={<UnauthorizedLayout />} >
                <Route index={true} path={RoutePath.SignIn} element={<SignIn />} />
                <Route path={RoutePath.SignUp} element={<SignUp />} />
                <Route index={true} path='/auth/:type' element={<ConfirmConfig />} />
                <Route element={<ResultErrorRequired />}>
                    <Route path='/result/:type' element={<ResultModal />} />
                </Route>
            </Route>
            <Route element={<MainLayout />}>
                <Route index={true} path={RoutePath.Home} element={<MainPage />} />
                <Route path={RoutePath.Feedbacks} element={<ReviewsPage />} />
                <Route path={RoutePath.Calendar} element={<CalendarPage />} />
                <Route path={RoutePath.Profile} element={<ProfilePage />} />
                <Route path={RoutePath.Settings} element={<SettingsPage />} />
                <Route path={RoutePath.Trainings} element={<TrainingsPage />} />
                <Route path={RoutePath.Achievements} element={<AchievementsPage />} />
            </Route>
        </Route>
        <Route path='*' element={<ErrorPage />} />
    </Routes >
)
