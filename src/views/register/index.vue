<template>
  <div class="register-container">
    <!-- <el-alert
      v-if="nodeEnv !== 'development'"
      title="注册页面"
      type="success"
      center
      :closable="false"
      style="position: fixed"
    ></el-alert> -->
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">Character</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="registerForm"
          :model="form"
          class="register-form"
          :rules="registerRules"
        >
          <div class="title-container">
            <h3 class="title">GEEKPLUS ADMIN</h3>
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon
              slot="prefix"
              icon-class="user"
              class="el-input__icon input-icon" />
            </span>
            <el-input
              v-model.trim="form.username"
              v-focus
              type="text"
              placeholder="请输入用户名"
              auto-complete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <span class="svg-container">
              <svg-icon
              slot="prefix"
              icon-class="mobile"
              class="el-input__icon input-icon" />
            </span>
            <el-input
              v-model.trim="form.phone"
              type="text"
              placeholder="请输入手机号"
              maxlength="11"
              show-word-limit
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="phoneCode" style="position: relative">
            <span class="svg-container">
              <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon" />
            </span>
            <el-input
              v-model.trim="form.phoneCode"
              type="text"
              placeholder="手机验证码"
            >
            </el-input>
            <el-button
              size="mini"
              type="primary"
              class="show-pwd phone-code"
              :disabled="isGetPhone"
              @click="getPhoneCode"
            >
              {{ phoneCode }}
            </el-button>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon input-icon" />
            </span>
            <el-input
              v-model.trim="form.password"
              type="password"
              placeholder="设置密码"
              autocomplete="new-password"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="register-btn"
              type="primary"
              @click.native.prevent="handleRegister"
            >
              注册
            </el-button>
            <div style="margin-top: 20px;">
                <router-link to="/login">
                <el-button type="text">登录</el-button>
              </router-link>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { isPassword, isPhone } from '@/utils/validate'
  export default {
    username: 'Register',
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if ('' == value) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        isGetPhone: false,
        getPhoneIntval: null,
        phoneCode: '获取验证码',
        showRegister: false,
        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        form: {},
        registerRules: {
          username: [
            { required: true, trigger: 'blur', message: '请输入用户名' },
            { max: 20, trigger: 'blur', message: '最多不能超过20个字' },
            { validator: validateUsername, trigger: 'blur' },
          ],
          phone: [
            { required: true, trigger: 'blur', message: '请输入手机号码' },
            { validator: validatePhone, trigger: 'blur' },
          ],
          password: [
            { required: true, trigger: 'blur', message: '请输入密码' },
            { validator: validatePassword, trigger: 'blur' },
          ],
          phoneCode: [
            { required: true, trigger: 'blur', message: '请输入手机验证码' },
          ],
        },
        loading: false,
        passwordType: 'password',
      }
    },
    created() {
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
      this.getPhoneIntval = null
      clearInterval(this.getPhoneIntval)
    },
    methods: {
      getPhoneCode() {
        if (!isPhone(this.form.phone)) {
          //this.$baseMessage('请输入手机号', 'error')
          this.$refs['registerForm'].validateField('phone')
          return
        }
        this.isGetPhone = true
        let n = 60
        this.getPhoneIntval = setInterval(() => {
          if (n > 0) {
            n--
            this.phoneCode = '重新获取(' + n + 's)'
          } else {
            this.getPhoneIntval = null
            clearInterval(this.getPhoneIntval)
            this.phoneCode = '获取验证码'
            this.isGetPhone = false
          }
        }, 1000)
      },
      handleRegister() {
        this.$refs['registerForm'].validate(async (valid) => {
          if (valid) {
            const param = {
              username: this.form.username,
              phone: this.form.phone,
              password: this.form.password,
              phoneCode: this.form.phoneCode,
            }
            const { msg } = await register(param)
            this.$baseMessage(msg, 'success')
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
  .register-container {
    height: 100vh;
    background: url('~@/assets/image/bg.jpeg') center center fixed
      no-repeat;
    background-size: cover;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .register-btn {
      display: inherit;
      width: 220px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .register-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 432px) / 2) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-password {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }

      .per-code {
        width: 100px;
        height: 36px;
        font-size: 20px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: #bbc1ce;
      }

      .phone-code {
        padding: 0 10px;
        height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 3px;
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 26px;
        font-weight: bold;
        color: $base-color-gray;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 8px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-pwd {
      position: absolute;
      top: 6px;
      right: 10px;
      font-size: 16px;
      color: $base-font-color;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          color: $base-color-red;
          line-height: 18px;
        }
      }

      .el-input {
        box-sizing: border-box;

        .el-input__count {
          .el-input__count-inner {
            background: transparent;
          }
        }

        .el-input__prefix {
          left: 15px;
          line-height: 45px;

          .svg-inline--fa {
            width: 20px;
          }
        }

        input {
          height: 47px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          color: $base-font-color;
          caret-color: $base-font-color;
          line-height: 47px;
          background: #f6f4fc;
          border: 0;
        }
      }
    }
  }
</style>
