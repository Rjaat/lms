import { createRouter, createWebHistory } from 'vue-router'
import { usersStore } from './stores/user'
import { sessionStore } from './stores/session'

let defaultRoute = '/courses'
const routes = [
	{
		path: '/',
		redirect: {
			name: 'Courses',
		},
	},
	{
		path: '/courses',
		name: 'Courses',
		component: () => import('@/pages/Courses.vue'),
	},
	{
		path: '/courses/:courseName',
		name: 'CourseDetail',
		component: () => import('@/pages/CourseDetail.vue'),
		props: true,
	},
	{
		path: '/courses/:courseName/learn/:chapterNumber-:lessonNumber',
		name: 'Lesson',
		component: () => import('@/pages/Lesson.vue'),
		props: true,
	},
	{
		path: '/batches',
		name: 'Batches',
		component: () => import('@/pages/Batches.vue'),
	},
	{
		path: '/batches/details/:batchName',
		name: 'BatchDetail',
		component: () => import('@/pages/BatchDetail.vue'),
		props: true,
	},
	{
		path: '/batches/:batchName',
		name: 'Batch',
		component: () => import('@/pages/Batch.vue'),
		props: true,
	},
	{
		path: '/billing/:type/:name',
		name: 'Billing',
		component: () => import('@/pages/Billing.vue'),
		props: true,
	},
	{
		path: '/statistics',
		name: 'Statistics',
		component: () => import('@/pages/Statistics.vue'),
	},
	{
		path: '/user/:userName',
		name: 'Profile',
		component: () => import('@/pages/Profile.vue'),
		props: true,
	},
	{
		path: '/job-openings',
		name: 'Jobs',
		component: () => import('@/pages/Jobs.vue'),
	},
	{
		path: '/job-openings/:job',
		name: 'JobDetail',
		component: () => import('@/pages/JobDetail.vue'),
		props: true,
	},
	{
		path: '/courses/:courseName/edit',
		name: 'CreateCourse',
		component: () => import('@/pages/CreateCourse.vue'),
		props: true,
	},
	{
		path: '/courses/:courseName/learn/:chapterNumber-:lessonNumber/edit',
		name: 'CreateLesson',
		component: () => import('@/pages/CreateLesson.vue'),
		props: true,
	},
	{
		path: '/batches/:batchName/edit',
		name: 'BatchCreation',
		component: () => import('@/pages/BatchCreation.vue'),
		props: true,
	},
	{
		path: '/job-opening/:jobName/edit',
		name: 'JobCreation',
		component: () => import('@/pages/JobCreation.vue'),
		props: true,
	},
	{
		path: '/assignment-submission/:assignmentName/:submissionName',
		name: 'AssignmentSubmission',
		component: () => import('@/pages/AssignmentSubmission.vue'),
		props: true,
	},
]

let router = createRouter({
	history: createWebHistory('/lms'),
	routes,
})

router.beforeEach(async (to, from, next) => {
	const { userResource } = usersStore()
	let { isLoggedIn } = sessionStore()

	try {
		if (isLoggedIn) {
			await userResource.reload()
		}
	} catch (error) {
		isLoggedIn = false
	}
	return next()
})

export default router
